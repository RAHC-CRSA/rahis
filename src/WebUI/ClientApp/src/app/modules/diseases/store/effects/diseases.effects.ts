import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { DiseaseService, SpeciesService } from '../../../../services';
import * as DiseaseActions from '../actions/diseases.actions';
import { FeedbackService } from 'app/common/helpers/feedback.service';

@Injectable()
export class DiseaseEffects {
    constructor(
        private actions$: Actions,
        private diseaseService: DiseaseService,
        private speciesService: SpeciesService,
        private feedbackService: FeedbackService,
        private router: Router
    ) {}

    loadDiseases$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DiseaseActions.loadDiseases),
            mergeMap(() =>
                this.diseaseService.getAllDiseases().pipe(
                    map((payload) =>
                        DiseaseActions.loadDiseasesSuccess({ payload: payload })
                    ),
                    catchError((error) =>
                        of(
                            DiseaseActions.setFeedback({
                                payload:
                                    this.feedbackService.processResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    loadTransboundaryDiseases$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DiseaseActions.loadTransBoundaryDiseases),
            exhaustMap((action) =>
                this.diseaseService
                    .getTransBoundaryDiseases(action.payload)
                    .pipe(
                        map((payload) =>
                            DiseaseActions.loadDiseasesSuccess({
                                payload: payload,
                            })
                        ),
                        catchError((error) =>
                            of(
                                DiseaseActions.setFeedback({
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

    addDisease$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DiseaseActions.addDisease),
            exhaustMap((action) =>
                this.diseaseService.addDisease(action.payload).pipe(
                    map((data) =>
                        DiseaseActions.addDiseaseSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(
                            DiseaseActions.setFeedback({
                                payload:
                                    this.feedbackService.processResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    addDiseaseSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(DiseaseActions.addDiseaseSuccess),
                tap((action) => {
                    this.router.navigateByUrl('/dashboard/diseases');
                })
            ),
        { dispatch: false }
    );

    deleteDisease$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DiseaseActions.deleteDisease),
            exhaustMap((action) =>
                this.diseaseService.deleteDisease(action.payload).pipe(
                    map((data) =>
                        DiseaseActions.deleteDiseaseSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(
                            DiseaseActions.setFeedback({
                                payload:
                                    this.feedbackService.processResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    loadSpecies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DiseaseActions.loadSpecies),
            mergeMap(() =>
                this.speciesService.getAllSpecies().pipe(
                    map((payload) =>
                        DiseaseActions.loadSpeciesSuccess({ payload: payload })
                    ),
                    catchError((error) =>
                        of(
                            DiseaseActions.setFeedback({
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
