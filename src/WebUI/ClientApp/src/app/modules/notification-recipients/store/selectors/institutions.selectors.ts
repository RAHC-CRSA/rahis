import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationRecipientsState } from '../reducers';
import { featureKey } from '../actions';

const notificationRecipientsState =
    createFeatureSelector<NotificationRecipientsState>(featureKey);

export const getRecipients = createSelector(
    notificationRecipientsState,
    (state: NotificationRecipientsState) => state.data
);

export const getRecipientsLoading = createSelector(
    notificationRecipientsState,
    (state: NotificationRecipientsState) => state.loading
);

export const getRecipientsLoaded = createSelector(
    notificationRecipientsState,
    (state: NotificationRecipientsState) => state.loaded
);

export const getFeedback = createSelector(
    notificationRecipientsState,
    (state: NotificationRecipientsState) => state.feedback
);
