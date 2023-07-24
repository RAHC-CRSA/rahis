import { NgModule } from '@angular/core';
import { EditProfessionalComponent } from './edit-professional.component';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { ProfessionalsModule } from 'app/modules/professionals/professionals.module';

export const routes: Route[] = [
    {
        path: '',
        component: EditProfessionalComponent,
    },
];

@NgModule({
    declarations: [EditProfessionalComponent],
    imports: [SharedModule, ProfessionalsModule, RouterModule.forChild(routes)],
})
export class EditProfessionalModule {}
