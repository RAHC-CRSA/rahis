import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeciesListComponent } from './species-list.component';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: SpeciesListComponent,
    },
];

@NgModule({
    declarations: [SpeciesListComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SpeciesListModule {}
