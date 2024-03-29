import { createAction, props } from '@ngrx/store';
import {
    AuthResponseDto,
    ICreateAuthTokenCommand,
    IResetPasswordCommand,
    ISetPasswordCommand,
    IUpdateProfileCommand,
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
    props<{ payload: AuthResponseDto; redirectUrl: string }>()
);

// Logout
export const LOGOUT = `[Auth] Logout`;
export const LOGOUT_SUCCESS = `[Auth] Logout Success`;

export const logout = createAction(LOGOUT, props<{ payload: string }>());
export const logoutSuccess = createAction(LOGOUT_SUCCESS);

// load user
export const LOAD_USER = `[Auth] Load User`;
export const LOAD_USER_SUCCESS = `[Auth] Load User Success`;
export const CHECK_TOKEN_EXPIRATION = `[Auth] Check Token Expiration`;
export const CHECK_TOKEN_EXPIRATION_SUCCESS = `[Auth] Check Token Expiration Success`;

export const loadUser = createAction(LOAD_USER);
export const loadUserSuccess = createAction(
    LOAD_USER_SUCCESS,
    props<{ payload: AuthResponseDto }>()
);

export const checkTokenExpiration = createAction(CHECK_TOKEN_EXPIRATION);
export const checkTokenExpirationSuccess = createAction(
    CHECK_TOKEN_EXPIRATION_SUCCESS
);

// Password Reset
export const RESET_PASSWORD = `[Auth] Reset Password`;
export const RESET_PASSWORD_SUCCESS = `[Auth] Reset Password Success`;

export const resetPassword = createAction(
    RESET_PASSWORD,
    props<{ payload: IResetPasswordCommand }>()
);
export const resetPasswordSuccess = createAction(
    RESET_PASSWORD_SUCCESS,
    props<{ payload: ServerResponse }>()
);

// Set password
export const SET_PASSWORD = `[Auth] Set Password`;
export const SET_PASSWORD_SUCCESS = `[Auth] Set Password Success`;

export const setPassword = createAction(
    SET_PASSWORD,
    props<{ payload: ISetPasswordCommand }>()
);
export const setPasswordSuccess = createAction(
    SET_PASSWORD_SUCCESS,
    props<{ payload: ServerResponse }>()
);

// Update profile
export const UPDATE_PROFILE = `[Auth] Update Profile`;
export const UPDATE_PROFILE_SUCCESS = `[Auth] Update Profile Success`;

export const updateProfile = createAction(
    UPDATE_PROFILE,
    props<{ payload: IUpdateProfileCommand }>()
);
export const updateProfileSuccess = createAction(
    UPDATE_PROFILE_SUCCESS,
    props<{ payload: ServerResponse }>()
);

// Set feedback
export const SET_FEEDBACK = '[Auth] Set Feedback';
export const CLEAR_FEEDBACK = '[Auth] Clear Feedback';

export const setFeedback = createAction(
    SET_FEEDBACK,
    props<{ payload: ServerResponse }>()
);

export const clearFeedback = createAction(CLEAR_FEEDBACK);
