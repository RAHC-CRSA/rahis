import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifierComponent } from './verifier.component';

const routes: Routes = [
    {
        path: '',
        component: VerifierComponent,
        data: {
            roles: ['Verifier'],
            title: 'Verifier Dashboard',
        },
        children: [
            {
                path: 'reports',
                children: [
                    {
                        path: 'verify',
                        loadChildren: () =>
                            import(
                                'app/views/reports/verify-report/verify-report.module'
                            ).then((m) => m.VerifyReportModule),
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
export class VerifierRoutingModule {}
