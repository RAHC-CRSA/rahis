import { NgModule } from '@angular/core';
import { RegionsListComponent } from './regions-list.component';
import { Route, RouterModule } from '@angular/router';
import { RegionsModule } from 'app/modules/regions/regions.module';
import { SharedModule } from 'app/shared/shared.module';

export const routes: Route[] = [
    {
        path: '',
        component: RegionsListComponent,
    },
];

@NgModule({
    declarations: [RegionsListComponent],
    imports: [RegionsModule, SharedModule, RouterModule.forChild(routes)],
})
export class RegionsListModule {}
