import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddInstitutionComponent } from './add-institution.component';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: AddInstitutionComponent,
    },
];

@NgModule({
    declarations: [AddInstitutionComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AddInstitutionModule {}
