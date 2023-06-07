import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsListComponent } from './reports-list.component';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: ReportsListComponent,
    },
];

@NgModule({
    declarations: [ReportsListComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ReportsListModule {}
