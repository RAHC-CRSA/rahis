import { NgModule } from '@angular/core';
import { ViewReportComponent } from './view-report.component';
import { SharedModule } from 'app/shared/shared.module';
import { ReportsModule } from 'app/modules/reports/reports.module';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: ViewReportComponent,
    },
];

@NgModule({
    declarations: [ViewReportComponent],
    imports: [SharedModule, ReportsModule, RouterModule.forChild(routes)],
})
export class ViewReportModule {}
