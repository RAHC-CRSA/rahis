import { NgModule } from '@angular/core';
import { AddSpeciesComponent } from './add-species.component';
import { Route, RouterModule } from '@angular/router';
import { SpeciesModule } from 'app/modules/species/species.module';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';

export const routes: Route[] = [
    {
        path: '',
        component: AddSpeciesComponent,
    },
];

@NgModule({
    declarations: [AddSpeciesComponent],
    imports: [SpeciesModule, SharedModule, RouterModule.forChild(routes), TranslocoModule],
})
export class AddSpeciesModule {}
