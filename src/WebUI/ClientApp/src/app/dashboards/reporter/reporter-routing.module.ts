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
                redirectTo: 'reports',
                pathMatch: 'full',
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
                    {
                        path: 'create-confirmation',
                        loadChildren: () =>
                            import(
                                'app/views/reports/create-confirmation/create-confirmation.module'
                            ).then((m) => m.CreateConfirmationModule),
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
