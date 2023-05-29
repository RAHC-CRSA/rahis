import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey } from '../actions/auth.actions';
import { AuthState } from '../reducers';

// selectors
const authState = createFeatureSelector<AuthState>(featureKey);
export const getUserLoading = createSelector(
  authState,
  (state: AuthState) => state.loading
);
export const getUserLoaded = createSelector(
  authState,
  (state: AuthState) => state.loaded
);
export const getUser = createSelector(
  authState,
  (state: AuthState) => state.data
);
export const getFeedback = createSelector(
  authState,
  (state: AuthState) => state.feedback
);
