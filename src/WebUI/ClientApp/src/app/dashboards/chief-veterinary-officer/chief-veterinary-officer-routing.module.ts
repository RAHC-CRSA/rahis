import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChiefVeterinaryOfficerComponent } from './chief-veterinary-officer.component';

const routes: Routes = [
    {
        path: '',
        component: ChiefVeterinaryOfficerComponent,
        data: {
            roles: ['Verifier'],
            title: 'Verifier Dashboard',
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
                        redirectTo: 'list',
                        pathMatch: 'full',
                    },
                    {
                        path: 'list',
                        loadChildren: () =>
                            import(
                                'app/views/reports/reports-list/reports-list.module'
                            ).then((m) => m.ReportsListModule),
                    },
                    {
                        path: 'view/:id',
                        loadChildren: () =>
                            import(
                                'app/views/reports/view-report/view-report.module'
                            ).then((m) => m.ViewReportModule),
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
export class ChiefVeterinaryOfficerRoutingModule {}
