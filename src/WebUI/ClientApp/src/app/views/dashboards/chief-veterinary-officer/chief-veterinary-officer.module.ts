import { NgModule } from '@angular/core';
import { ChiefVeterinaryOfficerComponent } from './chief-veterinary-officer.component';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { ReportAnalyticsModule } from 'app/common/modules/report-analytics/report-analytics.module';

export const routes: Route[] = [
    {
        path: '',
        component: ChiefVeterinaryOfficerComponent,
    },
];

@NgModule({
    declarations: [ChiefVeterinaryOfficerComponent],
    imports: [
        SharedModule,
        ReportAnalyticsModule,
        RouterModule.forChild(routes),
    ],
})
export class ChiefVeterinaryOfficerModule {}
