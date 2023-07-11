import { createAction, props } from '@ngrx/store';
import {
    IAddRecipientCommand,
    IDeleteRecipientCommand,
    NotificationRecipientDto,
    ServerResponse,
} from '../../../../web-api-client';

export const featureKey = 'notification-recipients';

// Load regions
export const LOAD_NOTIFICATION_RECIPIENTS = `[Notification Recipients] Load Notification Recipients`;
export const LOAD_NOTIFICATION_RECIPIENTS_FAIL = `[Notification Recipients] Load Notification Recipients Fail`;
export const LOAD_NOTIFICATION_RECIPIENTS_SUCCESS = `[Notification Recipients] Load Notification Recipients Success`;

export const loadNotificationRecipients = createAction(
    LOAD_NOTIFICATION_RECIPIENTS
);
export const loadNotificationRecipientsFail = createAction(
    LOAD_NOTIFICATION_RECIPIENTS_FAIL,
    props<{ payload: string }>()
);
export const loadNotificationRecipientsSuccess = createAction(
    LOAD_NOTIFICATION_RECIPIENTS_SUCCESS,
    props<{ payload: NotificationRecipientDto[] }>()
);

// Add institution
export const ADD_NOTIFICATION_RECIPIENT = `[Notification Recipients] Add Notification Recipient`;
export const ADD_NOTIFICATION_RECIPIENT_SUCCESS = `[Notification Recipients] Add Notification Recipient Success`;

export const addNotificationRecipient = createAction(
    ADD_NOTIFICATION_RECIPIENT,
    props<{ payload: IAddRecipientCommand }>()
);

export const addNotificationRecipientSuccess = createAction(
    ADD_NOTIFICATION_RECIPIENT_SUCCESS,
    props<{ payload: NotificationRecipientDto }>()
);

// Delete institution
export const DELETE_NOTIFICATION_RECIPIENT = `[Notification Recipients] Delete Notification Recipient`;
export const DELETE_NOTIFICATION_RECIPIENT_SUCCESS = `[Notification Recipients] Delete Notification Recipient Success`;

export const deleteNotificationRecipient = createAction(
    DELETE_NOTIFICATION_RECIPIENT,
    props<{ payload: IDeleteRecipientCommand }>()
);

export const deleteNotificationRecipientSuccess = createAction(
    DELETE_NOTIFICATION_RECIPIENT_SUCCESS,
    props<{ payload: number }>()
);

// Set feedback
export const SET_FEEDBACK = '[Notification Recipients] Set Feedback';
export const CLEAR_FEEDBACK = '[Notification Recipients] Clear Feedback';

export const setFeedback = createAction(
    SET_FEEDBACK,
    props<{ payload: ServerResponse }>()
);

export const clearFeedback = createAction(CLEAR_FEEDBACK);
