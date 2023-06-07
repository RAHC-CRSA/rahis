import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { reducer } from './store';
import { featureKey } from './store/actions';
import { effects } from './store/effects';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(featureKey, reducer),
        EffectsModule.forFeature(effects),
    ],
})
export class ReportsModule {}
