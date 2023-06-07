import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  createUser,
  createUserSuccess,
  featureKey,
  loadRoles,
  loadRolesFail,
  loadRolesSuccess,
  loadUsers,
  loadUsersFail,
  loadUsersSuccess,
} from '../actions';
import {
  ICreateUserCommand,
  IUserDto,
  IUserListDto,
} from '../../../../web-api-client';

export interface UserState {
  data?: IUserListDto[] | null;
  user?: IUserDto | null;
  roles?: string[] | null;
  loaded: boolean;
  loading: boolean;
  error?: string | null;
}

export const initialState: UserState = {
  data: null,
  user: null,
  roles: null,
  loaded: false,
  loading: false,
  error: null,
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
  on(loadUsersFail, (state, { payload }) => ({ ...state, error: payload })),
  on(loadUsersSuccess, (state, { payload }) => ({ ...state, data: payload })),
  on(loadRoles, (state) => ({ ...state, loading: true })),
  on(loadRolesFail, (state, { payload }) => ({ ...state, error: payload })),
  on(loadRolesSuccess, (state, { payload }) => ({ ...state, roles: payload }))
);

const usersState = createFeatureSelector<UserState>(featureKey);

export const getUsers = createSelector(
  usersState,
  (state: UserState) => state.data
);

export const getRoles = createSelector(
  usersState,
  (state: UserState) => state.roles
);
