import { NgModule } from '@angular/core';
import { SuperAdminComponent } from './super-admin.component';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: SuperAdminComponent,
    },
];

@NgModule({
    declarations: [SuperAdminComponent],
    imports: [SharedModule, RouterModule.forChild(routes)],
})
export class SuperAdminModule {}
