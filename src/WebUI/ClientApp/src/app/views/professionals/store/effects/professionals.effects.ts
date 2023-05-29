import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { InstitutionsService } from '../../../../services';
import * as ProfessionalsActions from '../actions/professionals.actions';

@Injectable()
export class ProfessionalsEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private institutionsService: InstitutionsService
  ) {}

  loadInstitutions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfessionalsActions.loadInstitutions),
      mergeMap(() =>
        this.institutionsService.getAllInstitutions().pipe(
          map((payload) =>
            ProfessionalsActions.loadInstitutionsSuccess({ payload: payload })
          ),
          catchError((error) =>
            of(ProfessionalsActions.loadInstitutionsFail({ payload: error }))
          )
        )
      )
    )
  );

  loadParaProfessionals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfessionalsActions.loadParaProfessionals),
      mergeMap((action) =>
        this.institutionsService.getAllParaProfessionals(action.payload).pipe(
          map((data) =>
            ProfessionalsActions.loadParaProfessionalsSuccess({ payload: data })
          ),
          catchError((error) =>
            of(
              ProfessionalsActions.loadParaProfessionalsFail({ payload: error })
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
        this.institutionsService.addParaProfessional(action.payload).pipe(
          map((data) =>
            ProfessionalsActions.addParaProfessionalSuccess({ payload: data })
          ),
          catchError((error) =>
            of(ProfessionalsActions.addParaProfessionalFail({ payload: error }))
          )
        )
      )
    )
  );

  addParaProfessionalSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfessionalsActions.addParaProfessionalSuccess),
        tap((action) => {
          this.router.navigateByUrl('/para-professionals');
        })
      ),
    { dispatch: false }
  );
}
