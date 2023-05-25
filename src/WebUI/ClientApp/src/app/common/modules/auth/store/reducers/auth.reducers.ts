import {
  login,
  loginSuccess,
  logout,
  logoutSuccess,
  loadUser,
  setFeedback,
  clearFeedback,
  loginFail,
} from '../actions/auth.actions';
import { UserModel as User } from '../../../../../models';
import { createReducer, on } from '@ngrx/store';
import { ServerResponse } from 'src/app/web-api-client';

export interface AuthState {
  data?: User | null;
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
  on(login, (state) => ({ ...state, loading: true, feedback: null })),
  on(loginFail, (state) => ({ ...state, loading: false })),
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
  on(setFeedback, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: !payload.isError,
    feedback: payload,
  })),
  on(clearFeedback, (state) => ({ ...state, feedback: null }))
);
