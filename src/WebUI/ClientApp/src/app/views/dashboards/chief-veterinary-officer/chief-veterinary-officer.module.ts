import { NgModule } from '@angular/core';
import { ChiefVeterinaryOfficerComponent } from './chief-veterinary-officer.component';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: ChiefVeterinaryOfficerComponent,
    },
];

@NgModule({
    declarations: [ChiefVeterinaryOfficerComponent],
    imports: [SharedModule, RouterModule.forChild(routes)],
})
export class ChiefVeterinaryOfficerModule {}
