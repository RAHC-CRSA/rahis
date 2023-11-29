import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user.component';
import { Route, RouterModule } from '@angular/router';
import { UsersModule } from 'app/modules/users/users.module';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';

export const routes: Route[] = [
    {
        path: '',
        component: CreateUserComponent,
    },
];

@NgModule({
    declarations: [CreateUserComponent],
    imports: [UsersModule, SharedModule, RouterModule.forChild(routes), TranslocoModule],
})
export class CreateUserModule {}
