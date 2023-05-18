import {
  login,
  loginSuccess,
  loginFail,
  logout,
  logoutSuccess,
  logoutFail,
  loadUser,
  featureKey,
} from '../actions/auth.actions';
import { UserModel as User } from '../../../../../models';
import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export interface AuthState {
  data?: User | null;
  loaded: boolean;
  loading: boolean;
  error?: string | null;
}

export const initialState: AuthState = {
  data: null,
  loaded: false,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(loadUser, (state) => ({ ...state, loading: true })),
  on(login, (state) => ({ ...state, loading: true, error: null })),
  on(loginFail, (state, { payload }) => ({
    ...state,
    error: payload,
    loading: false,
    loaded: false,
  })),
  on(loginSuccess, (state, { payload }) => ({
    ...state,
    data: payload,
    loading: false,
    loaded: true,
  })),
  on(logout, (state) => ({ ...state, loading: true, error: null })),
  on(logoutFail, (state, { payload }) => ({
    ...state,
    error: payload,
    loading: false,
  })),
  on(logoutSuccess, (state) => ({
    ...state,
    loading: false,
    loaded: false,
    data: null,
  }))
);

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
