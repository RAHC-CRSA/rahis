import { NgModule } from '@angular/core';
import { SpeciesListComponent } from './species-list.component';
import { Route, RouterModule } from '@angular/router';
import { SpeciesModule } from 'app/modules/species/species.module';
import { SharedModule } from 'app/shared/shared.module';

export const routes: Route[] = [
    {
        path: '',
        component: SpeciesListComponent,
    },
];

@NgModule({
    declarations: [SpeciesListComponent],
    imports: [SpeciesModule, SharedModule, RouterModule.forChild(routes)],
})
export class SpeciesListModule {}
