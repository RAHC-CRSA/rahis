import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { usersReducer as reducer } from './store/reducers';
import { featureKey } from './store/actions';
import { UsersEffects as effects } from './store/effects/users.effects';

@NgModule({
    imports: [
        StoreModule.forFeature(featureKey, reducer),
        EffectsModule.forFeature(effects),
    ],
})
export class UsersModule {}
