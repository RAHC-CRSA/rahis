import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OccurrencesListComponent } from './occurrences-list.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ReportsModule } from 'app/modules/reports/reports.module';
import { TranslocoModule } from '@ngneat/transloco';

export const routes: Route[] = [
    {
        path: '',
        component: OccurrencesListComponent,
    },
];

@NgModule({
    declarations: [OccurrencesListComponent],
    imports: [ReportsModule, SharedModule, RouterModule.forChild(routes), TranslocoModule],
})
export class OccurrencesListModule {}
