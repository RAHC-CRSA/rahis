import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionsListComponent } from './regions-list.component';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: RegionsListComponent,
    },
];

@NgModule({
    declarations: [RegionsListComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RegionsListModule {}
