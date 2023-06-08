import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import { Route, RouterModule } from '@angular/router';
import { UsersModule } from 'app/modules/users/users.module';
import { SharedModule } from 'app/shared/shared.module';

export const routes: Route[] = [
    {
        path: '',
        component: UsersListComponent,
    },
];

@NgModule({
    declarations: [UsersListComponent],
    imports: [UsersModule, SharedModule, RouterModule.forChild(routes)],
})
export class UsersListModule {}
