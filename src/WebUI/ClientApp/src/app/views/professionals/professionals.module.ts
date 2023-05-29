import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { featureKey } from './store/actions/professionals.actions';
import { reducer } from './store/reducers';
import { ProfessionalsEffects as effects } from './store/effects';

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

import { ProfessionalsRoutingModule } from './professionals-routing.module';
import { ProfessionalsComponent } from './professionals.component';
import { ProfessionalCreateComponent } from './components/professional-create/professional-create.component';
import { ProfessionalDetailComponent } from './components/professional-detail/professional-detail.component';
import { ProfessionalListComponent } from './components/professional-list/professional-list.component';

@NgModule({
  declarations: [
    ProfessionalsComponent,
    ProfessionalCreateComponent,
    ProfessionalDetailComponent,
    ProfessionalListComponent,
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
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature(effects),
    FormsModule,
    ReactiveFormsModule,
    ProfessionalsRoutingModule,
  ],
})
export class ProfessionalsModule {}
