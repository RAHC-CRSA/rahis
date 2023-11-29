import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiseasesListComponent } from './diseases-list.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { SpeciesModule } from 'app/modules/species/species.module';
import { TranslocoModule } from '@ngneat/transloco';

export const routes: Route[] = [
    {
        path: '',
        component: DiseasesListComponent,
    },
];

@NgModule({
    declarations: [DiseasesListComponent],
    imports: [SpeciesModule, SharedModule, RouterModule.forChild(routes), TranslocoModule],
})
export class DiseasesListModule {}
