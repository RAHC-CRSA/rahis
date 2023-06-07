import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OccurrencesListComponent } from './occurrences-list.component';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: OccurrencesListComponent,
    },
];

@NgModule({
    declarations: [OccurrencesListComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OccurrencesListModule {}
