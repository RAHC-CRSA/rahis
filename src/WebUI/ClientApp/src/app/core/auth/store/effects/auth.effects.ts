import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    catchError,
    exhaustMap,
    map,
    mergeMap,
    of,
    switchMap,
    tap,
} from 'rxjs';
import { AuthService } from '../../auth.service';
import * as AuthActions from '../actions/auth.actions';
import { ServerResponse } from 'app/web-api-client';

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
                    catchError((error) =>
                        of(AuthActions.loginFail({ payload: error }))
                    )
                )
            )
        )
    );

    loginFail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginFail),
            switchMap((action) => {
                let payload = new ServerResponse(action.payload);

                if (action.payload.isSwaggerException) {
                    payload.isError = true;
                    payload.summary = action.payload.message;
                    payload.errors = [action.payload.message];
                }
                return of(AuthActions.setFeedback({ payload }));
            }),
            tap(() => this.router.navigateByUrl('auth/login'))
        )
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
                    this.router.navigateByUrl('sign-in');
                })
            ),
        { dispatch: false }
    );

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loadUser),
            switchMap(() =>
                this.authService.getCurrentUser().pipe(
                    map((user) =>
                        user != null
                            ? AuthActions.loginSuccess({ payload: user })
                            : AuthActions.logout({ payload: 'sign-in' })
                    ),
                    catchError(() =>
                        of(AuthActions.logout({ payload: 'sign-in' }))
                    )
                )
            )
        )
    );

    checkTokenExpiration$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.checkTokenExpiration),
            switchMap(() => {
                if (this.authService.checkTokenIsInvalid()) {
                    return of(AuthActions.logout({ payload: 'sign-in' }));
                }

                return of(AuthActions.checkTokenExpirationSuccess());
            })
        )
    );
}
