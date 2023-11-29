import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionsListComponent } from './institutions-list.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { InstitutionsModule } from 'app/modules/institutions/institutions.module';
import { TranslocoModule } from '@ngneat/transloco';

export const routes: Route[] = [
    {
        path: '',
        component: InstitutionsListComponent,
    },
];

@NgModule({
    declarations: [InstitutionsListComponent],
    imports: [InstitutionsModule, SharedModule, RouterModule.forChild(routes), TranslocoModule],
})
export class InstitutionsListModule {}
