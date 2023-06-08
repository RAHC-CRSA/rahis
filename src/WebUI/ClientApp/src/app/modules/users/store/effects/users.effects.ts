import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { UserService } from '../../../../services';
import * as UserActions from '../actions/users.actions';

@Injectable()
export class UsersEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private userService: UserService
    ) {}

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            mergeMap(() =>
                this.userService.getAllUsers().pipe(
                    map((payload) =>
                        UserActions.loadUsersSuccess({ payload: payload })
                    ),
                    catchError((error) =>
                        of(UserActions.setFeedback({ payload: error }))
                    )
                )
            )
        )
    );

    loadRoles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadRoles),
            mergeMap(() =>
                this.userService.getRoles().pipe(
                    map((payload) =>
                        UserActions.loadRolesSuccess({ payload: payload })
                    ),
                    catchError((error) =>
                        of(UserActions.setFeedback({ payload: error }))
                    )
                )
            )
        )
    );

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.createUser),
            exhaustMap((action) =>
                this.userService.createUser(action.payload).pipe(
                    map((data) =>
                        UserActions.createUserSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(UserActions.setFeedback({ payload: error }))
                    )
                )
            )
        )
    );

    createUserSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(UserActions.createUserSuccess),
                tap((action) => {
                    this.router.navigateByUrl('/dashboard/users');
                })
            ),
        { dispatch: false }
    );
}
