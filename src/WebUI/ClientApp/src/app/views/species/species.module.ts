import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { speciesReducer as reducer } from './store/reducers';
import { featureKey } from './store/actions';
import { SpeciesEffects as effects } from './store/effects';

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

import { SpeciesRoutingModule } from './species-routing.module';
import { SpeciesComponent } from './species.component';
import { SpeciesListComponent } from './components/species-list/species-list.component';
import { SpeciesCreateComponent } from './components/species-create/species-create.component';
import { SpeciesDetailComponent } from './components/species-detail/species-detail.component';

@NgModule({
  declarations: [
    SpeciesComponent,
    SpeciesListComponent,
    SpeciesCreateComponent,
    SpeciesDetailComponent,
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
    SpeciesRoutingModule,
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature(effects),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SpeciesModule {}
