import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) =>
        this.authService.login(action.payload).pipe(
          map((data) => {
            this.authService.setCurrentUser(data);

            return AuthActions.loginSuccess({ payload: data });
          }),
          catchError((error) => of(AuthActions.loginFail({ payload: error })))
        )
      )
    )
  );

  loginFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFail),
        tap((action) => this.router.navigateByUrl('auth/login'))
      ),
    { dispatch: false }
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          this.authService.setCurrentUser(action.payload);
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  // logout$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.logout),
  //       tap(() => {
  //         // Remove the JWT token and user information from local storage
  //         this.authService.clearCurrentUser();
  //         AuthActions.logoutSuccess();
  //       })
  //     ),
  //   { dispatch: false }
  // );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      map(() => {
        this.authService.clearCurrentUser();
        return AuthActions.logoutSuccess();
      })
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          this.router.navigateByUrl('auth/login');
        })
      ),
    { dispatch: false }
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      exhaustMap(() =>
        this.authService.getCurrentUser().pipe(
          map((user) =>
            user != null
              ? AuthActions.loginSuccess({ payload: user })
              : AuthActions.loginFail({
                  payload: 'Could not load user from storage.',
                })
          ),
          catchError((error) => of(AuthActions.loginFail({ payload: error })))
        )
      )
    )
  );

  checkTokenExpiration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkTokenExpiration),
      map(() => {
        if (this.authService.checkTokenIsInvalid()) {
          return AuthActions.logout();
        }

        return AuthActions.checkTokenExpirationSuccess();
      })
    )
  );
}
