import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { RoleGuard } from './core/auth/guards/role.guard';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

    // Public routes for guests
    {
        path: '',
        // canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'guest',
        },
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('app/views/guest/home/home.module').then(
                        (m) => m.HomeModule
                    ),
            },
            {
                path: 'report',
                loadChildren: () =>
                    import('app/views/guest/report/report.module').then(
                        (m) => m.ReportModule
                    ),
            },
        ],
    },

    // Auth routes for guests
    {
        path: '',
        // canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('app/views/guest/home/home.module').then(
                        (m) => m.HomeModule
                    ),
            },
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.module'
                    ).then((m) => m.AuthConfirmationRequiredModule),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.module'
                    ).then((m) => m.AuthForgotPasswordModule),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.module'
                    ).then((m) => m.AuthResetPasswordModule),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule
                    ),
            },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        (m) => m.AuthSignOutModule
                    ),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.module'
                    ).then((m) => m.AuthUnlockSessionModule),
            },
        ],
    },

    // Dashboard routes
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'dashboard',
                canMatch: [RoleGuard],
                data: {
                    roles: ['Super Admin'],
                },
                loadChildren: () =>
                    import(
                        'app/dashboards/super-admin/super-admin.module'
                    ).then((m) => m.SuperAdminModule),
            },
            {
                path: 'dashboard',
                canMatch: [RoleGuard],
                data: {
                    roles: ['Admin'],
                },
                loadChildren: () =>
                    import('app/dashboards/admin/admin.module').then(
                        (m) => m.AdminModule
                    ),
            },
            {
                path: 'dashboard',
                canMatch: [RoleGuard],
                data: {
                    roles: ['Chief Veterinary Officer'],
                },
                loadChildren: () =>
                    import(
                        'app/dashboards/chief-veterinary-officer/chief-veterinary-officer.module'
                    ).then((m) => m.ChiefVeterinaryOfficerModule),
            },
            {
                path: 'dashboard',
                canMatch: [RoleGuard],
                data: {
                    roles: ['Reporter'],
                },
                loadChildren: () =>
                    import('app/dashboards/reporter/reporter.module').then(
                        (m) => m.ReporterModule
                    ),
            },
            {
                path: 'dashboard',
                canMatch: [RoleGuard],
                data: {
                    roles: ['Regional Animal Health Officer'],
                },
                loadChildren: () =>
                    import(
                        'app/dashboards/rah-officer/rah-officer.module'
                    ).then((m) => m.RahOfficerModule),
            },
            {
                path: 'dashboard/profile',
                loadChildren: () =>
                    import('app/modules/auth/profile/profile.module').then(
                        (m) => m.ProfileModule
                    ),
            },
        ],
    },
];
