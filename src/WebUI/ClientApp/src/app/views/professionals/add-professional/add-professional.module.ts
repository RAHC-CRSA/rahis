import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProfessionalComponent } from './add-professional.component';
import { Route, RouterModule } from '@angular/router';
import { ProfessionalsModule } from 'app/modules/professionals/professionals.module';
import { SharedModule } from 'app/shared/shared.module';

export const routes: Route[] = [
    {
        path: '',
        component: AddProfessionalComponent,
    },
];

@NgModule({
    declarations: [AddProfessionalComponent],
    imports: [ProfessionalsModule, SharedModule, RouterModule.forChild(routes)],
})
export class AddProfessionalModule {}
