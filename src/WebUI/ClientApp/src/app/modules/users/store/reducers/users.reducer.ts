import { createReducer, on } from '@ngrx/store';
import {
    clearFeedback,
    createUser,
    createUserSuccess,
    deleteUser,
    deleteUserSuccess,
    loadRoles,
    loadRolesSuccess,
    loadUsers,
    loadUsersSuccess,
    setFeedback,
} from '../actions';
import { ServerResponse, UserListDto } from '../../../../web-api-client';

export interface UserState {
    data?: UserListDto[] | null;
    entry?: UserListDto | null;
    roles?: string[] | null;
    loaded: boolean;
    loading: boolean;
    feedback?: ServerResponse | null;
}

export const initialState: UserState = {
    data: [],
    entry: null,
    roles: null,
    loaded: false,
    loading: false,
    feedback: null,
};

export const usersReducer = createReducer(
    initialState,
    on(createUser, (state) => ({
        ...state,
        loading: true,
        feedback: null,
    })),
    on(createUserSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        feedback: null,
        data: [...state.data, payload],
    })),
    on(loadUsers, (state) => ({ ...state, feedback: null, loading: true })),
    on(loadUsersSuccess, (state, { payload }) => ({
        ...state,
        loaded: true,
        feedback: null,
        data: payload,
    })),
    on(loadRoles, (state) => ({ ...state, feedback: null, loading: true })),
    on(loadRolesSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        roles: payload,
    })),
    on(deleteUser, (state) => ({ ...state, feedback: null, loading: true })),
    on(deleteUserSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        feedback: null,
        data: state.data.filter((e) => e.id != payload),
    })),
    on(setFeedback, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: !payload.isError,
        feedback: payload,
    })),
    on(clearFeedback, (state) => ({
        ...state,
        feedback: null,
    }))
);
