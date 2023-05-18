import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeciesCreateComponent } from './components/species-create/species-create.component';
import { SpeciesDetailComponent } from './components/species-detail/species-detail.component';
import { SpeciesListComponent } from './components/species-list/species-list.component';

import { SpeciesComponent } from './species.component';

const routes: Routes = [
  {
    path: '',
    component: SpeciesComponent,
    data: {
      title: $localize`Species`,
    },
    children: [
      {
        path: '',
        component: SpeciesListComponent,
        data: {
          title: $localize`Species List`,
        },
      },
      {
        path: 'create',
        component: SpeciesCreateComponent,
        data: {
          title: $localize`Create Species`,
        },
      },
      {
        path: ':id',
        component: SpeciesDetailComponent,
        data: {
          title: $localize`Species Detail`,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeciesRoutingModule {}
