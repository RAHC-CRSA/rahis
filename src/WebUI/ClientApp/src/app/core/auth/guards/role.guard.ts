import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthState } from '../store';
import { Store } from '@ngrx/store';
import { getRoles } from 'app/modules/users/store';

@Injectable({
    providedIn: 'root',
})
export class RoleGuard implements CanActivate {
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
                const allowedRoles = route.data.roles;
                for (let role in allowedRoles) {
                    if (!roles.includes(role)) return false;
                }

                return true;
            })
        );
    }
}
