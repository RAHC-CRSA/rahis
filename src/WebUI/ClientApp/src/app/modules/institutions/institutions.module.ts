import { NgModule } from '@angular/core';

import { featureKey } from './store/actions';
import { reducer } from './store/reducers';
import { InstitutionsEffects as effects } from './store/effects';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    imports: [
        StoreModule.forFeature(featureKey, reducer),
        EffectsModule.forFeature(effects),
    ],
})
export class InstitutionsModule {}
