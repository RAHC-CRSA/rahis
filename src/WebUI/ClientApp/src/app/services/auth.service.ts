import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { UserModel } from 'src/app/models';
import { environment } from 'src/environments/environment';
import { AuthRequestDto, GetAuthTokenClient } from 'src/app/web-api-client';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private unsubscribe: Subscription[] = [];
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // Http clients
  getAuthToken: GetAuthTokenClient;
  // getCurrentUser: GetCurrentUserClient;

  constructor(private http: HttpClient) {
    this.getAuthToken = new GetAuthTokenClient(http);
  }

  login(username: string, password: string): Observable<any> {
    const notFoundError = new Error('Not Found');
    if (!username || !password) {
      return of(notFoundError);
    }

    const request: AuthRequestDto = new AuthRequestDto({
      username,
      password,
    });

    return this.getAuthToken.handle(request);
  }

  getCurrentUser(): Observable<UserModel> {
    return new Observable<UserModel>((observer) =>
      observer.next(this.getAuthFromLocalStorage())
    );
  }

  private getAuthFromLocalStorage(): UserModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData: UserModel = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  private setAuthFromLocalStorage(user: UserModel): boolean {
    if (user && user.authToken) {
      console.log('Setting user', user);
      localStorage.setItem(
        this.authLocalStorageToken,
        JSON.stringify({
          appUserId: user.appUserId,
          authToken: user.authToken,
          roles: user.roles,
        })
      );
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
