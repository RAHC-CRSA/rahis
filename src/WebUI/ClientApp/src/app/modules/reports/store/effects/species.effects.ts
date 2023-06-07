import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { SpeciesService } from '../../../../services';
import * as SpeciesActions from '../actions/species.actions';

@Injectable()
export class SpeciesEffects {
  constructor(
    private actions$: Actions,
    private speciesService: SpeciesService,
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
            of(SpeciesActions.loadSpeciesFail({ payload: error }))
          )
        )
      )
    )
  );
}
