import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { DiseaseService } from '../../../../services';
import * as DiseaseActions from '../actions/diseases.actions';

@Injectable()
export class DiseaseEffects {
    constructor(
        private actions$: Actions,
        private diseaseService: DiseaseService,
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
                        of(DiseaseActions.setFeedback({ payload: error }))
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
                        of(DiseaseActions.setFeedback({ payload: error }))
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
}
