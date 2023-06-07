import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import {
    DiseaseService,
    InstitutionService,
    RegionService,
    ReportService,
    SpeciesService,
} from '../../../../services';
import * as ReportsActions from '../actions/reports.actions';

@Injectable()
export class ReportsEffects {
    constructor(
        private actions$: Actions,
        private regionsService: RegionService,
        private reportsService: ReportService,
        private speciesService: SpeciesService,
        private diseaseService: DiseaseService,
        private institutionsService: InstitutionService
    ) {}

    createReport$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportsActions.createReport),
            exhaustMap((action) =>
                this.reportsService.createReport(action.payload).pipe(
                    map((payload) =>
                        ReportsActions.createReportSuccess({ payload: payload })
                    ),
                    catchError((error) =>
                        of(ReportsActions.setFeedback({ payload: error }))
                    )
                )
            )
        )
    );

    loadCountries$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportsActions.loadCountries),
            mergeMap(() =>
                this.regionsService.getAllCountries().pipe(
                    map((payload) =>
                        ReportsActions.loadCountriesSuccess({
                            payload: payload,
                        })
                    ),
                    catchError((error) =>
                        of(ReportsActions.setFeedback({ payload: error }))
                    )
                )
            )
        )
    );

    loadRegions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportsActions.loadRegions),
            exhaustMap((action) =>
                this.regionsService.getAllRegions(action.payload).pipe(
                    map((data) =>
                        ReportsActions.loadRegionsSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(ReportsActions.setFeedback({ payload: error }))
                    )
                )
            )
        )
    );

    addRegion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportsActions.addRegion),
            exhaustMap((action) =>
                this.regionsService.addRegion(action.payload).pipe(
                    map((data) =>
                        ReportsActions.addRegionSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(ReportsActions.setFeedback({ payload: error }))
                    )
                )
            )
        )
    );

    loadOccurrences$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportsActions.loadOccurrences),
            mergeMap(() =>
                this.reportsService.getAllOccurrences().pipe(
                    map((data) =>
                        ReportsActions.loadOccurrencesSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(
                            ReportsActions.setFeedback({
                                payload: error,
                            })
                        )
                    )
                )
            )
        )
    );

    loadReports$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportsActions.loadReports),
            mergeMap(() =>
                this.reportsService.getAllReports().pipe(
                    map((data) =>
                        ReportsActions.loadReportsSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(ReportsActions.setFeedback({ payload: error }))
                    )
                )
            )
        )
    );

    loadReport$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportsActions.loadReport),
            exhaustMap((action) =>
                this.reportsService.getReport(action.payload).pipe(
                    map((data) =>
                        ReportsActions.loadReportSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(ReportsActions.setFeedback({ payload: error }))
                    )
                )
            )
        )
    );

    loadParaProfessionals$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportsActions.loadParaProfessionals),
            exhaustMap((action) =>
                this.institutionsService
                    .getAllParaProfessionals(action.payload)
                    .pipe(
                        map((data) =>
                            ReportsActions.loadParaProfessionalsSuccess({
                                payload: data,
                            })
                        ),
                        catchError((error) =>
                            of(
                                ReportsActions.setFeedback({
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
            ofType(ReportsActions.addParaProfessional),
            exhaustMap((action) =>
                this.institutionsService
                    .addParaProfessional(action.payload)
                    .pipe(
                        map((data) =>
                            ReportsActions.addParaProfessionalSuccess({
                                payload: data,
                            })
                        ),
                        catchError((error) =>
                            of(ReportsActions.setFeedback({ payload: error }))
                        )
                    )
            )
        )
    );

    loadInstitutions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportsActions.loadInstitutions),
            mergeMap(() =>
                this.institutionsService.getAllInstitutions().pipe(
                    map((payload) =>
                        ReportsActions.loadInstitutionsSuccess({
                            payload: payload,
                        })
                    ),
                    catchError((error) =>
                        of(ReportsActions.setFeedback({ payload: error }))
                    )
                )
            )
        )
    );

    addInstitution$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportsActions.addInstitution),
            exhaustMap((action) =>
                this.institutionsService.addInstitution(action.payload).pipe(
                    map((data) =>
                        ReportsActions.addInstitutionSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(ReportsActions.setFeedback({ payload: error }))
                    )
                )
            )
        )
    );

    loadSpecies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportsActions.loadSpecies),
            mergeMap(() =>
                this.speciesService.getAllSpecies().pipe(
                    map((payload) =>
                        ReportsActions.loadSpeciesSuccess({ payload: payload })
                    ),
                    catchError((error) =>
                        of(ReportsActions.setFeedback({ payload: error }))
                    )
                )
            )
        )
    );

    addSpecies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportsActions.addSpecies),
            exhaustMap((action) =>
                this.speciesService.addSpecies(action.payload).pipe(
                    map((data) =>
                        ReportsActions.addSpeciesSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(ReportsActions.setFeedback({ payload: error }))
                    )
                )
            )
        )
    );

    loadDiseases$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportsActions.loadDiseases),
            mergeMap(() =>
                this.diseaseService.getAllDiseases().pipe(
                    map((payload) =>
                        ReportsActions.loadDiseasesSuccess({ payload: payload })
                    ),
                    catchError((error) =>
                        of(ReportsActions.setFeedback({ payload: error }))
                    )
                )
            )
        )
    );

    addDisease$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportsActions.addDisease),
            exhaustMap((action) =>
                this.diseaseService.addDisease(action.payload).pipe(
                    map((data) =>
                        ReportsActions.addDiseaseSuccess({ payload: data })
                    ),
                    catchError((error) =>
                        of(ReportsActions.setFeedback({ payload: error }))
                    )
                )
            )
        )
    );
}
