import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthState } from '../store';
import { Store } from '@ngrx/store';
import { getUser } from '../store/selectors';

@Injectable({
    providedIn: 'root',
})
export class NoAuthGuard implements CanMatch {
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
        console.log('Check no auth...');
        return this._store
            .select(getUser)
            .pipe(exhaustMap((user) => of(user == null || user == undefined)));
    }
}
