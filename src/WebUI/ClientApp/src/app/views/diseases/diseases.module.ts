import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { diseaseReducer as reducer } from './store/reducers';
import { featureKey } from './store/actions/diseases.actions';
import { DiseaseEffects as effects } from './store/effects/diseases.effects';

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

import { DiseasesRoutingModule } from './diseases-routing.module';
import { DiseasesComponent } from './diseases.component';
import { DiseaseCreateComponent } from './components/disease-create/disease-create.component';
import { DiseaseListComponent } from './components/disease-list/disease-list.component';
import DiseaseDetailComponent from './components/disease-detail/disease-detail.component';

@NgModule({
  declarations: [
    DiseasesComponent,
    DiseaseCreateComponent,
    DiseaseListComponent,
    DiseaseDetailComponent,
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
    DiseasesRoutingModule,
    NgxDatatableModule,
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature(effects),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DiseasesModule {}
