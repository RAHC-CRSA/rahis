import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { InstitutionsService } from '../../../../services';
import * as InstitutionsActions from '../actions';

@Injectable()
export class InstitutionsEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private institutionsService: InstitutionsService
  ) {}

  loadInstitutions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InstitutionsActions.loadInstitutions),
      mergeMap(() =>
        this.institutionsService.getAllInstitutions().pipe(
          map((payload) =>
            InstitutionsActions.loadInstitutionsSuccess({ payload: payload })
          ),
          catchError((error) =>
            of(InstitutionsActions.loadInstitutionsFail({ payload: error }))
          )
        )
      )
    )
  );

  addInstitution$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InstitutionsActions.addInstitution),
      exhaustMap((action) =>
        this.institutionsService.addInstitution(action.payload).pipe(
          map((data) =>
            InstitutionsActions.addInstitutionSuccess({ payload: data })
          ),
          catchError((error) =>
            of(InstitutionsActions.addInstitutionFail({ payload: error }))
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
          this.router.navigateByUrl('/institutions');
        })
      ),
    { dispatch: false }
  );
}
