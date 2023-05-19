import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Select2Module } from 'ng-select2-component';

import { reducer } from './store';
import { featureKey } from './store/actions';
import { effects } from './store/effects';

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

import { SharedModule as AppSharedModule } from '../../common/modules/shared/shared.module';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ReportCreateComponent } from './components/report-create/report-create.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { ReportDetailComponent } from './components/report-detail/report-detail.component';
import { LocationInfoComponent } from './components/report-create/forms/location-info/location-info.component';
import { DiseaseInfoComponent } from './components/report-create/forms/disease-info/disease-info.component';
import { OccurrenceInfoComponent } from './components/report-create/forms/occurrence-info/occurrence-info.component';
import { InfectionInfoComponent } from './components/report-create/forms/infection-info/infection-info.component';
import { TreatmentInfoComponent } from './components/report-create/forms/treatment-info/treatment-info.component';
import { TreatmentSourceInfoComponent } from './components/report-create/forms/treatment-source-info/treatment-source-info.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OccurrencesListComponent } from './components/occurrences-list/occurrences-list.component';
import { OccurrenceDetailComponent } from './components/occurrence-detail/occurrence-detail.component';
import { ReportVerifyComponent } from './components/report-verify/report-verify.component';

@NgModule({
  declarations: [
    ReportsComponent,
    ReportCreateComponent,
    ReportListComponent,
    ReportDetailComponent,
    LocationInfoComponent,
    DiseaseInfoComponent,
    OccurrenceInfoComponent,
    InfectionInfoComponent,
    TreatmentInfoComponent,
    TreatmentSourceInfoComponent,
    OccurrencesListComponent,
    OccurrenceDetailComponent,
    ReportVerifyComponent,
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
    ReportsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppSharedModule,
    Select2Module,
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature(effects),
  ],
})
export class ReportsModule {}
