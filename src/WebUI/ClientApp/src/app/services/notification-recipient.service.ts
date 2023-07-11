import { Injectable } from '@angular/core';
import {
    AddRecipientClient,
    AddRecipientCommand,
    DeleteRecipientClient,
    DeleteRecipientCommand,
    GetRecipientsClient,
    IAddRecipientCommand,
    IDeleteRecipientCommand,
    NotificationRecipientDto,
} from '../web-api-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NotificationRecipientService {
    // Clients
    getRecipientsClient: GetRecipientsClient;
    addRecipientClient: AddRecipientClient;
    deleteRecipientClient: DeleteRecipientClient;

    constructor(http: HttpClient) {
        this.getRecipientsClient = new GetRecipientsClient(http);
        this.addRecipientClient = new AddRecipientClient(http);
        this.deleteRecipientClient = new DeleteRecipientClient(http);
    }

    getAllNotificationRecipients() {
        return this.getRecipientsClient.handle();
    }

    addNotificationRecipient(
        payload: IAddRecipientCommand
    ): Observable<NotificationRecipientDto> {
        const request = new AddRecipientCommand(payload);

        return this.addRecipientClient.handle(request);
    }

    deleteNotificationRecipient(payload: IDeleteRecipientCommand) {
        return this.deleteRecipientClient.handle(
            new DeleteRecipientCommand(payload)
        );
    }
}
