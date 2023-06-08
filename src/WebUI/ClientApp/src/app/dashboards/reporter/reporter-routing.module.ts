import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporterComponent } from './reporter.component';

const routes: Routes = [
    {
        path: '',
        component: ReporterComponent,
        data: {
            roles: ['Reporter'],
            title: 'Reporter Dashboard',
        },
        children: [
            {
                path: '',
                loadChildren: () =>
                    import(
                        'app/views/dashboards/reporter/reporter.module'
                    ).then((m) => m.ReporterModule),
            },
            {
                path: 'reports',
                children: [
                    {
                        path: '',
                        redirectTo: 'create',
                        pathMatch: 'full',
                    },
                    {
                        path: 'create',
                        loadChildren: () =>
                            import(
                                'app/views/reports/create-report/create-report.module'
                            ).then((m) => m.CreateReportModule),
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReporterRoutingModule {}
