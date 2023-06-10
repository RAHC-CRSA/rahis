import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRegionComponent } from './add-region.component';
import { Route, RouterModule } from '@angular/router';
import { RegionsModule } from 'app/modules/regions/regions.module';
import { SharedModule } from 'app/shared/shared.module';

export const routes: Route[] = [
    {
        path: '',
        component: AddRegionComponent,
    },
];

@NgModule({
    declarations: [AddRegionComponent],
    imports: [RegionsModule, SharedModule, RouterModule.forChild(routes)],
})
export class AddRegionModule {}
