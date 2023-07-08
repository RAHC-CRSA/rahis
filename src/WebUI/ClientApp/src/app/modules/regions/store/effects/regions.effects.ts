import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { RegionService } from '../../../../services';
import * as RegionsActions from '../actions/regions.actions';
import { FeedbackService } from 'app/common/helpers/feedback.service';

@Injectable()
export class RegionsEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private regionsService: RegionService,
        private feedbackService: FeedbackService
    ) {}

    loadCountries$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RegionsActions.loadCountries),
            mergeMap(() =>
                this.regionsService.getAllCountries().pipe(
                    map((payload) =>
                        RegionsActions.loadCountriesSuccess({
                            payload: payload,
                        })
                    ),
                    catchError((error) =>
                        of(
                            RegionsActions.setFeedback({
                                payload:
                                    this.feedbackService.processResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    loadRegions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RegionsActions.loadRegions),
            mergeMap((action) =>
                this.regionsService.getAllRegions(action.payload).pipe(
                    map((data) =>
                        RegionsActions.loadRegionsSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(
                            RegionsActions.setFeedback({
                                payload:
                                    this.feedbackService.processResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    addRegion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RegionsActions.addRegion),
            exhaustMap((action) =>
                this.regionsService.addRegion(action.payload).pipe(
                    map((data) =>
                        RegionsActions.addRegionSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(
                            RegionsActions.setFeedback({
                                payload:
                                    this.feedbackService.processResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    addRegionSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RegionsActions.addRegionSuccess),
                tap((action) => {
                    this.router.navigateByUrl('/dashboard/regions');
                })
            ),
        { dispatch: false }
    );

    deleteRegion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RegionsActions.deleteRegion),
            exhaustMap((action) =>
                this.regionsService.deleteRegion(action.payload).pipe(
                    map((data) =>
                        RegionsActions.deleteRegionSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(
                            RegionsActions.setFeedback({
                                payload:
                                    this.feedbackService.processResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    loadMunicipalities$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RegionsActions.loadMunicipalities),
            mergeMap((action) =>
                this.regionsService.getAllMunicipalities(action.payload).pipe(
                    map((data) =>
                        RegionsActions.loadMunicipalitiesSuccess({
                            payload: data,
                        })
                    ),
                    catchError((error) =>
                        of(
                            RegionsActions.setFeedback({
                                payload:
                                    this.feedbackService.processResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    loadDistricts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RegionsActions.loadDistricts),
            mergeMap((action) =>
                this.regionsService.getAllDistricts(action.payload).pipe(
                    map((data) =>
                        RegionsActions.loadDistrictsSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(
                            RegionsActions.setFeedback({
                                payload:
                                    this.feedbackService.processResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    loadCommunities$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RegionsActions.loadCommunities),
            mergeMap((action) =>
                this.regionsService.getAllCommunities(action.payload).pipe(
                    map((data) =>
                        RegionsActions.loadCommunitiesSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(
                            RegionsActions.setFeedback({
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
