import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDiseaseComponent } from './add-disease.component';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: AddDiseaseComponent,
    },
];

@NgModule({
    declarations: [AddDiseaseComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AddDiseaseModule {}
