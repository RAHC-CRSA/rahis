import { NgModule } from '@angular/core';
import { AddNotificationRecipientComponent } from './add-notification-recipient.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NotificationRecipientsModule } from 'app/modules/notification-recipients/notification-recipients.module';

export const routes: Route[] = [
    {
        path: '',
        component: AddNotificationRecipientComponent,
    },
];

@NgModule({
    declarations: [AddNotificationRecipientComponent],
    imports: [
        NotificationRecipientsModule,
        SharedModule,
        RouterModule.forChild(routes),
    ],
})
export class AddNotificationRecipientModule {}
