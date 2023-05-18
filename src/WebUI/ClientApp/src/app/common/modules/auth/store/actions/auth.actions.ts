import {
  createAction,
  createFeatureSelector,
  createSelector,
  props,
} from '@ngrx/store';
import { UserModel as User } from '../../../../../models';
import { AuthState } from '../reducers';

export const featureKey = 'auth';

// Login
export const LOGIN = `[Auth] Login`;
export const LOGIN_SUCCESS = `[Auth] Login Success`;
export const LOGIN_FAIL = `[Auth] Login Fail`;

export const login = createAction(
  LOGIN,
  props<{ username?: string; password?: string }>()
);
export const loginFail = createAction(LOGIN_FAIL, props<{ payload: string }>());
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ payload: User }>()
);

// Logout
export const LOGOUT = `[Auth] Logout`;
export const LOGOUT_FAIL = `[Auth] Logout Fail`;
export const LOGOUT_SUCCESS = `[Auth] Logout Success`;

export const logout = createAction(LOGOUT);
export const logoutFail = createAction(
  LOGOUT_FAIL,
  props<{ payload: string }>()
);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);

// load user
export const LOAD_USER = `[Auth] Load User`;
export const CHECK_TOKEN_EXPIRATION = `[Auth] Check Token Expiration`;
export const CHECK_TOKEN_EXPIRATION_SUCCESS = `[Auth] Check Token Expiration Success`;

export const loadUser = createAction(LOAD_USER);
export const checkTokenExpiration = createAction(CHECK_TOKEN_EXPIRATION);
export const checkTokenExpirationSuccess = createAction(
  CHECK_TOKEN_EXPIRATION_SUCCESS
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
export const getToken = createSelector(
  authState,
  (state: AuthState) => state.data?.authToken
);
