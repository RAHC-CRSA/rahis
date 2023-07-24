import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { InstitutionService } from '../../../../services';
import * as ProfessionalsActions from '../actions/professionals.actions';
import { FeedbackService } from 'app/common/helpers/feedback.service';

@Injectable()
export class ProfessionalsEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private institutionService: InstitutionService,
        private feedbackService: FeedbackService
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
                        of(
                            ProfessionalsActions.setFeedback({
                                payload:
                                    this.feedbackService.processResponse(error),
                            })
                        )
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
                                    payload:
                                        this.feedbackService.processResponse(
                                            error
                                        ),
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
                                    payload:
                                        this.feedbackService.processResponse(
                                            error
                                        ),
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
                tap(() => {
                    this.router.navigateByUrl('/dashboard/para-professionals');
                })
            ),
        { dispatch: false }
    );

    updateParaProfessional$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfessionalsActions.updateParaProfessional),
            exhaustMap((action) =>
                this.institutionService
                    .updateParaProfessional(action.payload)
                    .pipe(
                        map((data) =>
                            ProfessionalsActions.updateParaProfessionalSuccess({
                                payload: data,
                            })
                        ),
                        catchError((error) =>
                            of(
                                ProfessionalsActions.setFeedback({
                                    payload:
                                        this.feedbackService.processResponse(
                                            error
                                        ),
                                })
                            )
                        )
                    )
            )
        )
    );

    updateParaProfessionalSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProfessionalsActions.updateParaProfessionalSuccess),
                tap(() => {
                    this.router.navigateByUrl('/dashboard/para-professionals');
                })
            ),
        { dispatch: false }
    );

    deleteParaProfessional$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfessionalsActions.deleteParaProfessional),
            exhaustMap((action) =>
                this.institutionService
                    .deleteParaProfessional(action.payload)
                    .pipe(
                        map((data) =>
                            ProfessionalsActions.deleteParaProfessionalSuccess({
                                payload: data,
                            })
                        ),
                        catchError((error) =>
                            of(
                                ProfessionalsActions.setFeedback({
                                    payload:
                                        this.feedbackService.processResponse(
                                            error
                                        ),
                                })
                            )
                        )
                    )
            )
        )
    );
}
