import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { SpeciesService } from '../../../../services';
import * as SpeciesActions from '../actions/species.actions';
import { FeedbackService } from 'app/common/helpers/feedback.service';

@Injectable()
export class SpeciesEffects {
    constructor(
        private actions$: Actions,
        private speciesService: SpeciesService,
        private feedbackService: FeedbackService,
        private router: Router
    ) {}

    loadSpecies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SpeciesActions.loadSpecies),
            mergeMap(() =>
                this.speciesService.getAllSpecies().pipe(
                    map((payload) =>
                        SpeciesActions.loadSpeciesSuccess({ payload: payload })
                    ),
                    catchError((error) =>
                        of(
                            SpeciesActions.setFeedback({
                                payload:
                                    this.feedbackService.processResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    addSpecies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SpeciesActions.addSpecies),
            exhaustMap((action) =>
                this.speciesService.addSpecies(action.payload).pipe(
                    map((data) =>
                        SpeciesActions.addSpeciesSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(
                            SpeciesActions.setFeedback({
                                payload:
                                    this.feedbackService.processResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    addSpeciesSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(SpeciesActions.addSpeciesSuccess),
                tap((action) => {
                    this.router.navigateByUrl('/dashboard/species');
                })
            ),
        { dispatch: false }
    );

    updateSpecies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SpeciesActions.updateSpecies),
            exhaustMap((action) =>
                this.speciesService.updateSpecies(action.payload).pipe(
                    map((data) =>
                        SpeciesActions.updateSpeciesSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(
                            SpeciesActions.setFeedback({
                                payload:
                                    this.feedbackService.processResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    deleteSpecies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SpeciesActions.deleteSpecies),
            exhaustMap((action) =>
                this.speciesService.deleteSpecies(action.payload).pipe(
                    map((data) =>
                        SpeciesActions.deleteSpeciesSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(
                            SpeciesActions.setFeedback({
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
