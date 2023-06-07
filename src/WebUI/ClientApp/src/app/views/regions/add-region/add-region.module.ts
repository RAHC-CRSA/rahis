import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRegionComponent } from './add-region.component';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: AddRegionComponent,
    },
];

@NgModule({
    declarations: [AddRegionComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AddRegionModule {}
