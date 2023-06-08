import {
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store';
import {
    clearFeedback,
    createUser,
    createUserSuccess,
    featureKey,
    loadRoles,
    loadRolesSuccess,
    loadUsers,
    loadUsersSuccess,
    setFeedback,
} from '../actions';
import {
    ServerResponse,
    UserDto,
    UserListDto,
} from '../../../../web-api-client';

export interface UserState {
    data?: UserListDto[] | null;
    user?: UserDto | null;
    roles?: string[] | null;
    loaded: boolean;
    loading: boolean;
    feedback?: ServerResponse | null;
}

export const initialState: UserState = {
    data: null,
    user: null,
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
    })),
    on(createUserSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        user: payload,
    })),
    on(loadUsers, (state) => ({ ...state, loading: true })),
    on(loadUsersSuccess, (state, { payload }) => ({ ...state, data: payload })),
    on(loadRoles, (state) => ({ ...state, loading: true })),
    on(loadRolesSuccess, (state, { payload }) => ({
        ...state,
        roles: payload,
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
