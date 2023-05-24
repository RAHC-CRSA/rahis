import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { featureKey } from './store/actions';
import { reducer } from './store/reducers';
import { InstitutionsEffects as effects } from './store/effects';

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

import { InstitutionsRoutingModule } from './institutions-routing.module';
import { InstitutionCreateComponent } from './components/institution-create/institution-create.component';
import { InstitutionDetailComponent } from './components/institution-detail/institution-detail.component';
import { InstitutionListComponent } from './components/institution-list/institution-list.component';
import { InstitutionsComponent } from './institutions.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    InstitutionCreateComponent,
    InstitutionDetailComponent,
    InstitutionListComponent,
    InstitutionsComponent,
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
    InstitutionsRoutingModule,
  ],
})
export class InstitutionsModule {}
