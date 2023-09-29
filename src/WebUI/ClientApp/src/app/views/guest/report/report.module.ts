import { NgModule } from '@angular/core';
import { ReportComponent } from './report.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ReportsModule } from 'app/modules/reports/reports.module';

export const routes: Route[] = [
    {
        path: '',
        component: ReportComponent,
    },
];

@NgModule({
    declarations: [ReportComponent],
    imports: [ReportsModule, SharedModule, RouterModule.forChild(routes)],
})
export class ReportModule {}
