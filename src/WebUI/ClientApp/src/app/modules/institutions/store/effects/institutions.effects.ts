import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { InstitutionService } from '../../../../services';
import * as InstitutionsActions from '../actions';

@Injectable()
export class InstitutionsEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private institutionService: InstitutionService
    ) {}

    loadInstitutions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InstitutionsActions.loadInstitutions),
            mergeMap(() =>
                this.institutionService.getAllInstitutions().pipe(
                    map((payload) =>
                        InstitutionsActions.loadInstitutionsSuccess({
                            payload: payload,
                        })
                    ),
                    catchError((error) =>
                        of(InstitutionsActions.setFeedback({ payload: error }))
                    )
                )
            )
        )
    );

    addInstitution$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InstitutionsActions.addInstitution),
            exhaustMap((action) =>
                this.institutionService.addInstitution(action.payload).pipe(
                    map((data) =>
                        InstitutionsActions.addInstitutionSuccess({
                            payload: data,
                        })
                    ),
                    catchError((error) =>
                        of(
                            InstitutionsActions.setFeedback({
                                payload: error,
                            })
                        )
                    )
                )
            )
        )
    );

    addInstitutionSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(InstitutionsActions.addInstitutionSuccess),
                tap((action) => {
                    this.router.navigateByUrl('/dashboard/institutions');
                })
            ),
        { dispatch: false }
    );
}
