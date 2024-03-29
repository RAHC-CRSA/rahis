import { NgModule } from '@angular/core';
import { AddDiseaseComponent } from './add-disease.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { DiseasesModule } from 'app/modules/diseases/diseases.module';
import { TranslocoModule } from '@ngneat/transloco';

export const routes: Route[] = [
    {
        path: '',
        component: AddDiseaseComponent,
    },
];

@NgModule({
    declarations: [AddDiseaseComponent],
    imports: [DiseasesModule, SharedModule, RouterModule.forChild(routes), TranslocoModule],
})
export class AddDiseaseModule {}
