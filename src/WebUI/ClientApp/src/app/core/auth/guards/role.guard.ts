import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthState } from '../store';
import { Store } from '@ngrx/store';
import { getRoles } from '../store/selectors';

@Injectable({
    providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanActivateChild {
    userRoles$: Observable<string[] | null | undefined>;

    constructor(private _store: Store<AuthState>) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this._store.select(getRoles).pipe(
            map((roles) => {
                if (roles) {
                    const allowedRoles = route.data.roles;
                    for (let role of allowedRoles) {
                        if (!roles.includes(role)) return false;
                    }
                }

                return true;
            })
        );
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }
}
