import { Injectable, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState, getUser } from '../modules/auth/store/reducers';
import { checkTokenExpiration } from '../modules/auth/store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.store.dispatch(checkTokenExpiration());
    console.log('Guarding...');
    return this.store.select(getUser).pipe(
      map((user) => {
        if (user && user?.authToken != null) {
          return true;
        }
        this.router.navigateByUrl('auth/login');
        return false;
      }),
      catchError((error) => {
        this.router.navigateByUrl('auth/login');
        return of(false);
      })
    );
  }
}
