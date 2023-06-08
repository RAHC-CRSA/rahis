import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers';
import { featureKey } from '../actions';

const usersState = createFeatureSelector<UserState>(featureKey);

export const getUsers = createSelector(
    usersState,
    (state: UserState) => state.data
);

export const getRoles = createSelector(
    usersState,
    (state: UserState) => state.roles
);

export const getUsersLoading = createSelector(
    usersState,
    (state: UserState) => state.loading
);
