import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import {
    AuthResponseDto,
    CreateAuthTokenCommand,
    GetAuthTokenClient,
    ICreateAuthTokenCommand,
    IResetPasswordCommand,
    ISetPasswordCommand,
    IUpdateProfileCommand,
    PasswordResetClient,
    ResetPasswordCommand,
    SetPasswordClient,
    SetPasswordCommand,
    UpdateProfileCommand,
    UpdateUserProfileClient,
} from 'app/web-api-client';

@Injectable()
export class AuthService {
    private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
    private _authenticated: boolean = false;

    // Http clients
    getAuthTokenClient: GetAuthTokenClient;
    passwordResetClient: PasswordResetClient;
    setPasswordClient: SetPasswordClient;
    updateUserProfileClient: UpdateUserProfileClient;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {
        this.getAuthTokenClient = new GetAuthTokenClient(_httpClient);
        this.passwordResetClient = new PasswordResetClient(_httpClient);
        this.setPasswordClient = new SetPasswordClient(_httpClient);
        this.updateUserProfileClient = new UpdateUserProfileClient(_httpClient);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post('api/auth/sign-in', credentials).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Sign in using the token
        return this._httpClient
            .post('api/auth/sign-in-with-token', {
                accessToken: this.accessToken,
            })
            .pipe(
                catchError(() =>
                    // Return false
                    of(false)
                ),
                switchMap((response: any) => {
                    // Replace the access token with the new one if it's available on
                    // the response object.
                    //
                    // This is an added optional step for better security. Once you sign
                    // in using the token, you should generate a new one on the server
                    // side and attach it to the response object. Then the following
                    // piece of code can replace the token with the refreshed one.
                    if (response.accessToken) {
                        this.accessToken = response.accessToken;
                    }

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    // Return true
                    return of(true);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        name: string;
        email: string;
        password: string;
        company: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }

    login(payload: ICreateAuthTokenCommand): Observable<any> {
        const notFoundError = new Error('Not Found');
        if (!payload) {
            return of(notFoundError);
        }

        const request: CreateAuthTokenCommand = new CreateAuthTokenCommand({
            username: payload.username,
            password: payload.password,
        });

        return this.getAuthTokenClient.handle(request);
    }

    passwordReset(payload: IResetPasswordCommand) {
        const request = new ResetPasswordCommand(payload);

        return this.passwordResetClient.handle(request);
    }

    setPassword(payload: ISetPasswordCommand) {
        const request = new SetPasswordCommand(payload);
        return this.setPasswordClient.handle(request);
    }

    updateProfile(payload: IUpdateProfileCommand) {
        const request = new UpdateProfileCommand(payload);
        return this.updateUserProfileClient.handle(request);
    }

    getCurrentUser(): Observable<AuthResponseDto> {
        return new Observable<AuthResponseDto>((observer) =>
            observer.next(this.getAuthFromLocalStorage())
        );
    }

    setCurrentUser(user: AuthResponseDto): void {
        this.setAuthFromLocalStorage(user);
    }

    clearCurrentUser() {
        localStorage.removeItem(this.authLocalStorageToken);
    }

    checkTokenIsInvalid() {
        return this.checkTokenExpiry();
    }

    private getAuthFromLocalStorage(): AuthResponseDto | undefined {
        try {
            const lsValue = localStorage.getItem(this.authLocalStorageToken);
            if (!lsValue) {
                return undefined;
            }

            const authData: AuthResponseDto = JSON.parse(lsValue);
            return authData;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    private setAuthFromLocalStorage(user: AuthResponseDto): boolean {
        if (user && user.authToken) {
            localStorage.setItem(
                this.authLocalStorageToken,
                JSON.stringify({
                    appUserId: user.appUserId,
                    authToken: user.authToken,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    roles: user.roles,
                    countryId: user.countryId,
                    countryName: user.countryName,
                    countryFlag: user.countryFlag,
                })
            );
            return true;
        }
        return false;
    }

    private checkTokenExpiry() {
        const token = localStorage.getItem(this.authLocalStorageToken);
        if (token) {
            const decoded = jwt_decode<JwtPayload>(token || '') || null;

            if (decoded) {
                const currentTime = Date.now() / 1000;
                if (decoded?.exp && decoded?.exp > currentTime) {
                    return false;
                }
            }
        }

        localStorage.removeItem(this.authLocalStorageToken);
        return true;
    }
}
