import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user.component';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: CreateUserComponent,
    },
];

@NgModule({
    declarations: [CreateUserComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CreateUserModule {}
