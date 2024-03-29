import { NgModule } from '@angular/core';
import { EditInstitutionComponent } from './edit-institution.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { InstitutionsModule } from 'app/modules/institutions/institutions.module';
import { TranslocoModule } from '@ngneat/transloco';

export const routes: Route[] = [
    {
        path: '',
        component: EditInstitutionComponent,
    },
];

@NgModule({
    declarations: [EditInstitutionComponent],
    imports: [SharedModule, InstitutionsModule, RouterModule.forChild(routes), TranslocoModule],
})
export class EditInstitutionModule {}
