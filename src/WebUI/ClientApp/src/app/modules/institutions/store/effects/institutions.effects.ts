import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { InstitutionService } from '../../../../services';
import * as InstitutionsActions from '../actions';
import { FeedbackService } from 'app/common/helpers/feedback.service';

@Injectable()
export class InstitutionsEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private institutionService: InstitutionService,
        private feedbackService: FeedbackService
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
                        of(
                            InstitutionsActions.setFeedback({
                                payload:
                                    this.feedbackService.processResponse(error),
                            })
                        )
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
                                payload:
                                    this.feedbackService.processResponse(error),
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

    updateInstitution$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InstitutionsActions.updateInstitution),
            exhaustMap((action) =>
                this.institutionService.updateInstitution(action.payload).pipe(
                    map((data) =>
                        InstitutionsActions.updateInstitutionSuccess({
                            payload: data,
                        })
                    ),
                    catchError((error) =>
                        of(
                            InstitutionsActions.setFeedback({
                                payload:
                                    this.feedbackService.processResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    updateInstitutionSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(InstitutionsActions.updateInstitutionSuccess),
                tap((action) => {
                    this.router.navigateByUrl('/dashboard/institutions');
                })
            ),
        { dispatch: false }
    );

    deleteInstitution$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InstitutionsActions.deleteInstitution),
            exhaustMap((action) =>
                this.institutionService.deleteInstitution(action.payload).pipe(
                    map((data) =>
                        InstitutionsActions.deleteInstitutionSuccess({
                            payload: data,
                        })
                    ),
                    catchError((error) =>
                        of(
                            InstitutionsActions.setFeedback({
                                payload:
                                    this.feedbackService.processResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );
}
