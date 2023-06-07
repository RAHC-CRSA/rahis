import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiseasesListComponent } from './diseases-list.component';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: DiseasesListComponent,
    },
];

@NgModule({
    declarations: [DiseasesListComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DiseasesListModule {}
