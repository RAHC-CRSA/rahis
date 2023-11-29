import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddInstitutionComponent } from './add-institution.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { InstitutionsModule } from 'app/modules/institutions/institutions.module';
import { TranslocoModule } from '@ngneat/transloco';

export const routes: Route[] = [
    {
        path: '',
        component: AddInstitutionComponent,
    },
];

@NgModule({
    declarations: [AddInstitutionComponent],
    imports: [InstitutionsModule, SharedModule, RouterModule.forChild(routes), TranslocoModule],
})
export class AddInstitutionModule {}
