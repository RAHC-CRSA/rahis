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
      title: $localize`Reports`,
    },
    children: [
      {
        path: '',
        component: ReportListComponent,
        data: {
          title: $localize`Report List`,
        },
      },
      {
        path: 'occurrences',
        component: OccurrencesListComponent,
        data: {
          title: $localize`Occurrences`,
        },
      },
      {
        path: 'occurrences/:id',
        component: OccurrenceDetailComponent,
        data: {
          title: $localize`Occurrence Detail`,
        },
      },
      {
        path: 'create',
        component: ReportCreateComponent,
        data: {
          title: $localize`Create Report`,
        },
      },
      {
        path: 'create/confirmation',
        component: ConfirmationComponent,
        data: {
          title: $localize`Create Success`,
        },
      },
      {
        path: ':id',
        component: ReportDetailComponent,
        data: {
          title: $localize`Report Detail`,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
