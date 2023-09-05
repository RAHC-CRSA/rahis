import {
    login,
    loginSuccess,
    logout,
    logoutSuccess,
    loadUser,
    setFeedback,
    clearFeedback,
    loadUserSuccess,
    resetPassword,
    resetPasswordSuccess,
    setPassword,
    setPasswordSuccess,
    updateProfile,
    updateProfileSuccess,
} from '../actions/auth.actions';
import { createReducer, on } from '@ngrx/store';
import { AuthResponseDto } from 'app/web-api-client';
import { ServerResponse } from '../../../../web-api-client';

export interface AuthState {
    data?: AuthResponseDto | null;
    loaded: boolean;
    loading: boolean;
    feedback?: ServerResponse | null;
}

export const initialState: AuthState = {
    data: null,
    loaded: false,
    loading: false,
    feedback: null,
};

export const authReducer = createReducer(
    initialState,
    on(loadUser, (state) => ({ ...state, loading: true })),
    on(loadUserSuccess, (state, { payload }) => ({
        ...state,
        data: payload,
        loading: false,
        loaded: true,
    })),
    on(login, (state) => ({ ...state, loading: true, feedback: null })),
    on(loginSuccess, (state, { payload }) => ({
        ...state,
        data: payload,
        loading: false,
        loaded: true,
    })),
    on(logout, (state) => ({ ...state, loading: true, feedback: null })),
    on(logoutSuccess, (state) => ({
        ...state,
        loading: false,
        loaded: false,
        data: null,
    })),
    on(resetPassword, (state) => ({
        ...state,
        loading: true,
        feedback: null,
    })),
    on(resetPasswordSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        feedback: payload,
    })),
    on(setPassword, (state) => ({ ...state, loading: true, feedback: null })),
    on(setPasswordSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        feedback: payload,
    })),
    on(updateProfile, (state) => ({ ...state, loading: true, feedback: null })),
    on(updateProfileSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        feedback: payload,
    })),
    on(setFeedback, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: !payload.isError,
        feedback: payload,
    })),
    on(clearFeedback, (state) => ({ ...state, feedback: null }))
);
