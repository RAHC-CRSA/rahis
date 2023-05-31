import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { RegionsService } from '../../../../services';
import * as RegionsActions from '../actions/regions.actions';

@Injectable()
export class RegionsEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private regionsService: RegionsService
  ) {}

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegionsActions.loadCountries),
      mergeMap(() =>
        this.regionsService.getAllCountries().pipe(
          map((payload) =>
            RegionsActions.loadCountriesSuccess({ payload: payload })
          ),
          catchError((error) =>
            of(RegionsActions.loadCountriesFail({ payload: error }))
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
          map((data) => RegionsActions.loadRegionsSuccess({ payload: data })),
          catchError((error) =>
            of(RegionsActions.loadRegionsFail({ payload: error }))
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
          map((data) => RegionsActions.addRegionSuccess({ payload: data })),
          catchError((error) =>
            of(RegionsActions.addRegionFail({ payload: error }))
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
          this.router.navigateByUrl('/regions');
        })
      ),
    { dispatch: false }
  );
}
