import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';

const routes: Routes = [
    {
        path: '',
        component: SuperAdminComponent,
        data: {
            roles: ['Super Admin'],
            title: `Super Admin Dashboard`,
        },
        children: [
            {
                path: 'reports/create',
                loadChildren: () =>
                    import(
                        'app/views/reports/create-report/create-report.module'
                    ).then((m) => m.CreateReportModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SuperAdminRoutingModule {}
