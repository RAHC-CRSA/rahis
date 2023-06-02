import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OccurrenceDetailComponent } from './components/occurrence-detail/occurrence-detail.component';
import { OccurrencesListComponent } from './components/occurrences-list/occurrences-list.component';
import { ReportCreateComponent } from './components/report-create/report-create.component';
import { ReportDetailComponent } from './components/report-detail/report-detail.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { ReportsComponent } from './reports.component';
import { ConfirmationComponent } from './components/report-create/forms/confirmation/confirmation.component';

const routes: Routes = [
    {
        path: '',
        component: ReportsComponent,
        data: {
            title: `Reports`,
        },
        children: [
            {
                path: 'list',
                component: ReportListComponent,
                data: {
                    title: `Report List`,
                },
            },
            // {
            //   path: 'occurrences',
            //   component: OccurrencesListComponent,
            //   data: {
            //     title: `Occurrences`,
            //   },
            // },
            // {
            //   path: 'occurrences/:id',
            //   component: OccurrenceDetailComponent,
            //   data: {
            //     title: `Occurrence Detail`,
            //   },
            // },
            {
                path: 'create',
                component: ReportCreateComponent,
                data: {
                    title: `Create Report`,
                },
            },
            // {
            //   path: 'create/confirmation',
            //   component: ConfirmationComponent,
            //   data: {
            //     title: `Create Success`,
            //   },
            // },
            // {
            //   path: ':id',
            //   component: ReportDetailComponent,
            //   data: {
            //     title: `Report Detail`,
            //   },
            // },
            { path: '', pathMatch: 'full', redirectTo: 'list' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReportsRoutingModule {}
