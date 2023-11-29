import { NgModule } from '@angular/core';
import { ReportsListComponent } from './reports-list.component';
import { Route, RouterModule } from '@angular/router';
import { ReportsModule } from 'app/modules/reports/reports.module';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';

export const routes: Route[] = [
    {
        path: '',
        component: ReportsListComponent,
    },
];

@NgModule({
    declarations: [ReportsListComponent],
    imports: [ReportsModule, SharedModule, RouterModule.forChild(routes), TranslocoModule],
})
export class ReportsListModule {}
