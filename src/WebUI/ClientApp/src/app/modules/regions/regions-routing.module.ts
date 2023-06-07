import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionCreateComponent } from './components/region-create/region-create.component';
import { RegionListComponent } from './components/region-list/region-list.component';

import { RegionsComponent } from './regions.component';

const routes: Routes = [
  {
    path: '',
    component: RegionsComponent,
    data: {
      title: $localize`Regions`,
    },
    children: [
      {
        path: '',
        component: RegionListComponent,
        data: {
          title: $localize`Regions List`,
        },
      },
      {
        path: 'create',
        component: RegionCreateComponent,
        data: {
          title: $localize`Create Region`,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegionsRoutingModule {}
