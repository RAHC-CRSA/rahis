import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSpeciesComponent } from './add-species.component';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: AddSpeciesComponent,
    },
];

@NgModule({
    declarations: [AddSpeciesComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AddSpeciesModule {}
