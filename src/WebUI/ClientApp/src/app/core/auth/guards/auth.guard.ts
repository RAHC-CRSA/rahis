import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthState } from '../store';
import { Store } from '@ngrx/store';
import { getUser } from '../store/selectors';
import { checkTokenExpiration } from '../store/actions/auth.actions';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanMatch {
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
        return this._check(segments);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check the authenticated status
     *
     * @param segments
     * @private
     */
    private _check(segments: UrlSegment[]): Observable<boolean | UrlTree> {
        // Check the authentication status
        this._store.dispatch(checkTokenExpiration());
        return this._store.select(getUser).pipe(
            map((user) => {
                if (user && user?.authToken != null) {
                    return true;
                } else {
                    // Redirect to the sign-in page with a redirectUrl param
                    const redirectURL = `/${segments.join('/')}`;
                    const urlTree = this._router.parseUrl(
                        `sign-in?redirectURL=${redirectURL}`
                    );

                    return urlTree;
                }
            }),
            catchError((error) => {
                return of(false);
            })
        );
    }
}
