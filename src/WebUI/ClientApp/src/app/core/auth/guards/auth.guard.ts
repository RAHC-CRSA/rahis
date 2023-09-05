import { Injectable } from '@angular/core';
import { Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthState } from '../store';
import { Store } from '@ngrx/store';
import { getUser } from '../store/selectors';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    /**
     * Constructor
     */
    constructor(private _router: Router, private _store: Store<AuthState>) {}

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
        return this._store.select(getUser).pipe(
            map((user) => {
                if (user !== null && user?.authToken !== '') {
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
