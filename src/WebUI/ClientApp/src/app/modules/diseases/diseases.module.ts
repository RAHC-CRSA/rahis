import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { diseaseReducer as reducer } from './store/reducers';
import { featureKey } from './store/actions/diseases.actions';
import { DiseaseEffects as effects } from './store/effects/diseases.effects';

@NgModule({
    imports: [
        StoreModule.forFeature(featureKey, reducer),
        EffectsModule.forFeature(effects),
    ],
})
export class DiseasesModule {}
