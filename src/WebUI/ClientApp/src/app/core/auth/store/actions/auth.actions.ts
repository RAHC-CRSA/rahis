import { createAction, props } from '@ngrx/store';
import {
    AuthResponseDto,
    ICreateAuthTokenCommand,
    ServerResponse,
} from '../../../../../app/web-api-client';

export const featureKey = 'auth';

// Login
export const LOGIN = `[Auth] Login`;
export const LOGIN_FAIL = `[Auth] Login Fail`;
export const LOGIN_SUCCESS = `[Auth] Login Success`;

export const login = createAction(
    LOGIN,
    props<{ payload: ICreateAuthTokenCommand; redirectUrl: string }>()
);
export const loginFail = createAction(
    LOGIN_FAIL,
    props<{ payload: ServerResponse | any }>()
);
export const loginSuccess = createAction(
    LOGIN_SUCCESS,
    props<{ payload: AuthResponseDto }>()
);

// Logout
export const LOGOUT = `[Auth] Logout`;
export const LOGOUT_SUCCESS = `[Auth] Logout Success`;

export const logout = createAction(LOGOUT, props<{ payload: string }>());
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

// Set feedback
export const SET_FEEDBACK = '[Auth] Set Feedback';
export const CLEAR_FEEDBACK = '[Auth] Clear Feedback';

export const setFeedback = createAction(
    SET_FEEDBACK,
    props<{ payload: ServerResponse }>()
);

export const clearFeedback = createAction(CLEAR_FEEDBACK);
