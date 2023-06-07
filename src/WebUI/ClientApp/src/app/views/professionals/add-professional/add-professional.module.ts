import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProfessionalComponent } from './add-professional.component';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: AddProfessionalComponent,
    },
];

@NgModule({
    declarations: [AddProfessionalComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AddProfessionalModule {}
