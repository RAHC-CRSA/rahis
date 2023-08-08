import { Injectable } from '@angular/core';
import { Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, exhaustMap, map, of } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthState } from '../store';
import { Store } from '@ngrx/store';
import { getUser } from '../store/selectors';

@Injectable({
    providedIn: 'root',
})
export class NoAuthGuard {
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _store: Store<AuthState>
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can match
     *
     * @param route
     * @param segments
     */
    canMatch(
        route: Route,
        segments: UrlSegment[]
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this._check();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check the authenticated status
     *
     * @private
     */
    private _check(): Observable<boolean> {
        // Check the authentication status
        return this._store.select(getUser).pipe(
            map((user) => {
                return !(user != null || user != undefined);
            })
        );
    }
}
