import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionCreateComponent } from './components/institution-create/institution-create.component';
import { InstitutionListComponent } from './components/institution-list/institution-list.component';

import { InstitutionsComponent } from './institutions.component';

const routes: Routes = [
  {
    path: '',
    component: InstitutionsComponent,
    data: {
      title: $localize`Institutions`,
    },
    children: [
      {
        path: '',
        component: InstitutionListComponent,
        data: {
          title: $localize`Institutions List`,
        },
      },
      {
        path: 'create',
        component: InstitutionCreateComponent,
        data: {
          title: $localize`Create Institution`,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionsRoutingModule {}
