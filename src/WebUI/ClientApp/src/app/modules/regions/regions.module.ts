import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducer } from './store/reducers';
import { featureKey } from './store/actions';
import { RegionsEffects as effects } from './store/effects/regions.effects';

@NgModule({
    imports: [
        StoreModule.forFeature(featureKey, reducer),
        EffectsModule.forFeature(effects),
    ],
})
export class RegionsModule {}
