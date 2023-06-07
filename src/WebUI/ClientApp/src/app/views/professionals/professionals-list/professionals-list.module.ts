import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessionalsListComponent } from './professionals-list.component';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: ProfessionalsListComponent,
    },
];

@NgModule({
    declarations: [ProfessionalsListComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ProfessionalsListModule {}
