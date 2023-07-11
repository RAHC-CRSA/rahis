import { NgModule } from '@angular/core';
import { NotificationRecipientsListComponent } from './notification-recipients-list.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NotificationRecipientsModule } from 'app/modules/notification-recipients/notification-recipients.module';

export const routes: Route[] = [
    {
        path: '',
        component: NotificationRecipientsListComponent,
    },
];

@NgModule({
    declarations: [NotificationRecipientsListComponent],
    imports: [
        NotificationRecipientsModule,
        SharedModule,
        RouterModule.forChild(routes),
    ],
})
export class NotificationRecipientsListModule {}
