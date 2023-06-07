import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: UsersListComponent,
    },
];

@NgModule({
    declarations: [UsersListComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UsersListModule {}
