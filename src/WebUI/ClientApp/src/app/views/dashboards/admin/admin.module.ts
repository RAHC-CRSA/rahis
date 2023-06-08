import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: AdminComponent,
    },
];

@NgModule({
    declarations: [AdminComponent],
    imports: [SharedModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
