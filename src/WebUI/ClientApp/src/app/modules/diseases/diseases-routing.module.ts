import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiseaseCreateComponent } from './components/disease-create/disease-create.component';
// import DiseaseDetailComponent from './components/disease-detail/disease-detail.component';
import { DiseaseListComponent } from './components/disease-list/disease-list.component';

import { DiseasesComponent } from './diseases.component';

const routes: Routes = [
    {
        path: '',
        component: DiseasesComponent,
        children: [
            {
                path: 'list',
                component: DiseaseListComponent,
            },
            {
                path: 'create',
                component: DiseaseCreateComponent,
                data: {
                    title: `Create Disease`,
                },
            },
            { path: '', pathMatch: 'full', redirectTo: 'list' },
            // {
            //     path: ':id',
            //     component: DiseaseDetailComponent,
            //     data: {
            //         title: `Disease Detail`,
            //     },
            // },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DiseasesRoutingModule {}
