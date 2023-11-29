import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateConfirmationComponent } from './create-confirmation.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';

export const routes: Route[] = [
    {
        path: '',
        component: CreateConfirmationComponent,
    },
];

@NgModule({
    declarations: [CreateConfirmationComponent],
    imports: [SharedModule, RouterModule.forChild(routes), TranslocoModule],
})
export class CreateConfirmationModule {}
