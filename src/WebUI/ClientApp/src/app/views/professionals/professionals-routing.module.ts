import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessionalListComponent } from './components/professional-list/professional-list.component';
import { ProfessionalCreateComponent } from './components/professional-create/professional-create.component';

import { ProfessionalsComponent } from './professionals.component';

const routes: Routes = [
  {
    path: '',
    component: ProfessionalsComponent,
    data: {
      title: $localize`Para-Professionals`,
    },
    children: [
      {
        path: '',
        component: ProfessionalListComponent,
        data: {
          title: $localize`Para-Professionals List`,
        },
      },
      {
        path: 'create',
        component: ProfessionalCreateComponent,
        data: {
          title: $localize`Create Para-Professional`,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessionalsRoutingModule {}
