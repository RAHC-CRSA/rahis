import * as actions from '../actions/notification-recipients.actions';
import { createReducer, on } from '@ngrx/store';
import {
    NotificationRecipientDto,
    ServerResponse,
} from '../../../../web-api-client';

export interface NotificationRecipientsState {
    data?: NotificationRecipientDto[] | null;
    entry?: NotificationRecipientDto | null;
    loaded: boolean;
    loading: boolean;
    feedback?: ServerResponse | null;
}

export const initialState: NotificationRecipientsState = {
    data: [],
    entry: null,
    loaded: false,
    loading: false,
    feedback: null,
};

export const reducer = createReducer(
    initialState,
    on(actions.addNotificationRecipient, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.addNotificationRecipientSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        data: [...state.data, payload],
        loading: false,
    })),
    on(actions.deleteNotificationRecipient, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.deleteNotificationRecipientSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        data: state.data.filter((e) => e.id != payload),
    })),
    on(actions.loadNotificationRecipients, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadNotificationRecipientsSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        data: payload,
    })),
    on(actions.setFeedback, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: !payload.isError,
        feedback: payload,
    })),
    on(actions.clearFeedback, (state) => ({
        ...state,
        feedback: null,
    }))
);
