import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { reducer } from './store/reducers';
import { featureKey } from './store/actions';
import { RegionsEffects as effects } from './store/effects/regions.effects';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule,
} from '@coreui/angular';

import { RegionsRoutingModule } from './regions-routing.module';
import { RegionsComponent } from './regions.component';
import { RegionListComponent } from './components/region-list/region-list.component';
import { RegionCreateComponent } from './components/region-create/region-create.component';
import { RegionDetailComponent } from './components/region-detail/region-detail.component';

@NgModule({
  declarations: [
    RegionsComponent,
    RegionListComponent,
    RegionCreateComponent,
    RegionDetailComponent,
  ],
  imports: [
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    SharedModule,
    CommonModule,
    RegionsRoutingModule,
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature(effects),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RegionsModule {}
