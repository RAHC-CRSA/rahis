import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionsListComponent } from './institutions-list.component';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: InstitutionsListComponent,
    },
];

@NgModule({
    declarations: [InstitutionsListComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class InstitutionsListModule {}
