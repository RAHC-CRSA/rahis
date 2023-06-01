import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from 'app/shared/shared.module';

import { reducer } from './store';
import { featureKey } from './store/actions';
import { effects } from './store/effects';

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
import { VaccinationsComponent } from './components/report-create/forms/vaccinations/vaccinations.component';
import { DiagnosticTestsComponent } from './components/report-create/forms/diagnostic-tests/diagnostic-tests.component';
import { MedicationsComponent } from './components/report-create/forms/medications/medications.component';
import { ConfirmationComponent } from './components/report-create/forms/confirmation/confirmation.component';

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
        VaccinationsComponent,
        DiagnosticTestsComponent,
        MedicationsComponent,
        ConfirmationComponent,
    ],
    imports: [
        SharedModule,
        CommonModule,
        ReportsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatStepperModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        StoreModule.forFeature(featureKey, reducer),
        EffectsModule.forFeature(effects),
    ],
})
export class ReportsModule {}
