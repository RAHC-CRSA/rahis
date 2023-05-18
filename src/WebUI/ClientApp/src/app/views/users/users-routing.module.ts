import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: $localize`Users`,
    },
    children: [
      {
        path: '',
        component: UserListComponent,
        data: {
          title: $localize`User List`,
        },
      },
      {
        path: 'create',
        component: UserCreateComponent,
        data: {
          title: $localize`Create User`,
        },
      },
      {
        path: ':id',
        component: UserDetailComponent,
        data: {
          title: $localize`User Detail`,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
