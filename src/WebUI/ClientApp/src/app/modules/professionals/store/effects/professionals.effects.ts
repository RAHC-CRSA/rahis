import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { InstitutionService } from '../../../../services';
import * as ProfessionalsActions from '../actions/professionals.actions';

@Injectable()
export class ProfessionalsEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private institutionService: InstitutionService
    ) {}

    loadInstitutions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfessionalsActions.loadInstitutions),
            mergeMap(() =>
                this.institutionService.getAllInstitutions().pipe(
                    map((payload) =>
                        ProfessionalsActions.loadInstitutionsSuccess({
                            payload: payload,
                        })
                    ),
                    catchError((error) =>
                        of(ProfessionalsActions.setFeedback({ payload: error }))
                    )
                )
            )
        )
    );

    loadParaProfessionals$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfessionalsActions.loadParaProfessionals),
            mergeMap((action) =>
                this.institutionService
                    .getAllParaProfessionals(action.payload)
                    .pipe(
                        map((data) =>
                            ProfessionalsActions.loadParaProfessionalsSuccess({
                                payload: data,
                            })
                        ),
                        catchError((error) =>
                            of(
                                ProfessionalsActions.setFeedback({
                                    payload: error,
                                })
                            )
                        )
                    )
            )
        )
    );

    addParaProfessional$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfessionalsActions.addParaProfessional),
            exhaustMap((action) =>
                this.institutionService
                    .addParaProfessional(action.payload)
                    .pipe(
                        map((data) =>
                            ProfessionalsActions.addParaProfessionalSuccess({
                                payload: data,
                            })
                        ),
                        catchError((error) =>
                            of(
                                ProfessionalsActions.setFeedback({
                                    payload: error,
                                })
                            )
                        )
                    )
            )
        )
    );

    addParaProfessionalSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProfessionalsActions.addParaProfessionalSuccess),
                tap((action) => {
                    this.router.navigateByUrl('/dashboard/para-professionals');
                })
            ),
        { dispatch: false }
    );
}
