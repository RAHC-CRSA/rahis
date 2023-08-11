import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        data: {
            roles: ['Admin'],
            title: 'Admin Dashboard',
        },
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('app/views/dashboards/admin/admin.module').then(
                        (m) => m.AdminModule
                    ),
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
                        path: 'create',
                        loadChildren: () =>
                            import(
                                'app/views/reports/create-report/create-report.module'
                            ).then((m) => m.CreateReportModule),
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
                    {
                        path: 'occurrences',
                        loadChildren: () =>
                            import(
                                'app/views/reports/occurrences-list/occurrences-list.module'
                            ).then((m) => m.OccurrencesListModule),
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
            {
                path: 'regions',
                children: [
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full',
                    },
                    {
                        path: 'create',
                        loadChildren: () =>
                            import(
                                'app/views/regions/add-region/add-region.module'
                            ).then((m) => m.AddRegionModule),
                    },
                    {
                        path: 'list',
                        loadChildren: () =>
                            import(
                                'app/views/regions/regions-list/regions-list.module'
                            ).then((m) => m.RegionsListModule),
                    },
                ],
            },
            {
                path: 'species',
                children: [
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full',
                    },
                    {
                        path: 'create',
                        loadChildren: () =>
                            import(
                                'app/views/species/add-species/add-species.module'
                            ).then((m) => m.AddSpeciesModule),
                    },
                    {
                        path: 'list',
                        loadChildren: () =>
                            import(
                                'app/views/species/species-list/species-list.module'
                            ).then((m) => m.SpeciesListModule),
                    },
                ],
            },
            {
                path: 'diseases',
                children: [
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full',
                    },
                    {
                        path: 'create',
                        loadChildren: () =>
                            import(
                                'app/views/diseases/add-disease/add-disease.module'
                            ).then((m) => m.AddDiseaseModule),
                    },
                    {
                        path: 'list',
                        loadChildren: () =>
                            import(
                                'app/views/diseases/diseases-list/diseases-list.module'
                            ).then((m) => m.DiseasesListModule),
                    },
                ],
            },
            {
                path: 'institutions',
                children: [
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full',
                    },
                    {
                        path: 'edit/:id',
                        loadChildren: () =>
                            import(
                                'app/views/institutions/edit-institution/edit-institution.module'
                            ).then((m) => m.EditInstitutionModule),
                    },
                    {
                        path: 'create',
                        loadChildren: () =>
                            import(
                                'app/views/institutions/add-institution/add-institution.module'
                            ).then((m) => m.AddInstitutionModule),
                    },
                    {
                        path: 'list',
                        loadChildren: () =>
                            import(
                                'app/views/institutions/institutions-list/institutions-list.module'
                            ).then((m) => m.InstitutionsListModule),
                    },
                ],
            },
            {
                path: 'para-professionals',
                children: [
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full',
                    },
                    {
                        path: 'edit/:id',
                        loadChildren: () =>
                            import(
                                'app/views/professionals/edit-professional/edit-professional.module'
                            ).then((m) => m.EditProfessionalModule),
                    },
                    {
                        path: 'create',
                        loadChildren: () =>
                            import(
                                'app/views/professionals/add-professional/add-professional.module'
                            ).then((m) => m.AddProfessionalModule),
                    },
                    {
                        path: 'list',
                        loadChildren: () =>
                            import(
                                'app/views/professionals/professionals-list/professionals-list.module'
                            ).then((m) => m.ProfessionalsListModule),
                    },
                ],
            },
            {
                path: 'notification-recipients',
                children: [
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full',
                    },
                    {
                        path: 'create',
                        loadChildren: () =>
                            import(
                                'app/views/notification-recipients/add-notification-recipient/add-notification-recipient.module'
                            ).then((m) => m.AddNotificationRecipientModule),
                    },
                    {
                        path: 'list',
                        loadChildren: () =>
                            import(
                                'app/views/notification-recipients/notification-recipients-list/notification-recipients-list.module'
                            ).then((m) => m.NotificationRecipientsListModule),
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
export class AdminRoutingModule {}
