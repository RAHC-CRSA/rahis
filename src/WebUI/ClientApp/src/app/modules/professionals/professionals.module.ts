import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { featureKey } from './store/actions/professionals.actions';
import { reducer } from './store/reducers';
import { ProfessionalsEffects as effects } from './store/effects';

@NgModule({
    imports: [
        StoreModule.forFeature(featureKey, reducer),
        EffectsModule.forFeature(effects),
    ],
})
export class ProfessionalsModule {}
