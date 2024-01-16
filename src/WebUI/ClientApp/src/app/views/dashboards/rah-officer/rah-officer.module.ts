import { NgModule } from '@angular/core';
import { RahOfficerComponent } from './rah-officer.component';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: RahOfficerComponent,
    },
];

@NgModule({
    declarations: [RahOfficerComponent],
    imports: [SharedModule, RouterModule.forChild(routes)],
})
export class RahOfficerModule {}
