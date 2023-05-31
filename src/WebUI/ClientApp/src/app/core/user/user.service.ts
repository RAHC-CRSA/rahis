import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { AuthState } from '../auth/store';
import { Store } from '@ngrx/store';
import { AuthResponseDto } from 'app/web-api-client';
import { getUser } from '../auth/store/selectors';

@Injectable({
    providedIn: 'root',
})
export class UserService implements OnInit {
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    private _user$: Observable<AuthResponseDto | null | undefined>;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _store: Store<AuthState>
    ) {}

    ngOnInit() {
        this._store.select(getUser).pipe(
            map((user) => {
                let data: User = {
                    id: user.appUserId,
                    name: user.username,
                    email: user.username,
                    role: user.roles[0],
                    avatar: '',
                };

                this._user.next(data);
            })
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User> {
        return this._httpClient.get<User>('api/common/user').pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', { user }).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}
