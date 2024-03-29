import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ReportsModule } from 'app/modules/reports/reports.module';

import { CreateReportComponent } from './create-report.component';
import { ConfirmationComponent } from './forms/confirmation/confirmation.component';
import { DiagnosticTestsComponent } from './forms/diagnostic-tests/diagnostic-tests.component';
import { DiseaseInfoComponent } from './forms/disease-info/disease-info.component';
import { InfectionInfoComponent } from './forms/infection-info/infection-info.component';
import { LocationInfoComponent } from './forms/location-info/location-info.component';
import { MedicationsComponent } from './forms/medications/medications.component';
import { OccurrenceInfoComponent } from './forms/occurrence-info/occurrence-info.component';
import { TreatmentInfoComponent } from './forms/treatment-info/treatment-info.component';
import { VaccinationsComponent } from './forms/vaccinations/vaccinations.component';
import { ReportTypeComponent } from './forms/report-type/report-type.component';
import { ViewSummaryComponent } from './forms/view-summary/view-summary.component';

import { AddParaProfessionalComponent } from './forms/add-para-professional/add-para-professional.component';
import { AddRegionComponent } from './forms/add-region/add-region.component';
import { AddInstitutionComponent } from './forms/add-institution/add-institution.component';
import { AddSpeciesComponent } from './forms/add-species/add-species.component';
import { AddDiseaseComponent } from './forms/add-disease/add-disease.component';
import { TranslocoModule } from '@ngneat/transloco';
import { ExcelImportComponent } from './forms/excel-import/excel-import.component';
import { ReviewComponent } from './forms/review/review.component';

export const routes: Route[] = [
    {
        path: '',
        component: CreateReportComponent,
    },
];

@NgModule({
    declarations: [
        CreateReportComponent,
        ConfirmationComponent,
        DiagnosticTestsComponent,
        DiseaseInfoComponent,
        InfectionInfoComponent,
        LocationInfoComponent,
        MedicationsComponent,
        OccurrenceInfoComponent,
        TreatmentInfoComponent,
        VaccinationsComponent,
        ReportTypeComponent,
        AddParaProfessionalComponent,
        AddRegionComponent,
        AddInstitutionComponent,
        AddSpeciesComponent,
        AddDiseaseComponent,
        ExcelImportComponent,
        ViewSummaryComponent,
        ReviewComponent,
    ],
    imports: [
        ReportsModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslocoModule,
    ],
})
export class CreateReportModule {}
