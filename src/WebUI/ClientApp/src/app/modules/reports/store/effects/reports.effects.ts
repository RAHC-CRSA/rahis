import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import {
  InstitutionsService,
  RegionsService,
  ReportsService,
} from '../../../../services';
import * as ReportsActions from '../actions/reports.actions';

@Injectable()
export class ReportsEffects {
  constructor(
    private actions$: Actions,
    private regionsService: RegionsService,
    private reportsService: ReportsService,
    private institutionsService: InstitutionsService
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
            of(ReportsActions.createReportFail({ payload: error }))
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
            ReportsActions.loadCountriesSuccess({ payload: payload })
          ),
          catchError((error) =>
            of(ReportsActions.loadCountriesFail({ payload: error }))
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
          map((data) => ReportsActions.loadRegionsSuccess({ payload: data })),
          catchError((error) =>
            of(ReportsActions.loadRegionsFail({ payload: error }))
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
            of(ReportsActions.loadOccurrencesFail({ payload: error }))
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
          map((data) => ReportsActions.loadReportsSuccess({ payload: data })),
          catchError((error) =>
            of(ReportsActions.loadReportsFail({ payload: error }))
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
          map((data) => ReportsActions.loadReportSuccess({ payload: data })),
          catchError((error) =>
            of(ReportsActions.loadReportFail({ payload: error }))
          )
        )
      )
    )
  );

  loadParaProfessionals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportsActions.loadParaProfessionals),
      exhaustMap((action) =>
        this.institutionsService.getAllParaProfessionals(action.payload).pipe(
          map((data) =>
            ReportsActions.loadParaProfessionalsSuccess({ payload: data })
          ),
          catchError((error) =>
            of(ReportsActions.loadParaProfessionalsFail({ payload: error }))
          )
        )
      )
    )
  );
}
