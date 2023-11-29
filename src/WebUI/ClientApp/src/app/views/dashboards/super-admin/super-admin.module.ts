import { NgModule } from '@angular/core';
import { SuperAdminComponent } from './super-admin.component';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';

import { ReportAnalyticsModule } from 'app/common/modules/report-analytics/report-analytics.module';
import { TranslocoModule } from '@ngneat/transloco';

export const routes: Route[] = [
    {
        path: '',
        component: SuperAdminComponent,
    },
];

@NgModule({
    declarations: [SuperAdminComponent],
    imports: [
        SharedModule,
        ReportAnalyticsModule,
        RouterModule.forChild(routes),
        TranslocoModule
    ],
})
export class SuperAdminModule {}
