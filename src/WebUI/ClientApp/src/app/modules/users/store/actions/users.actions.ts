import { createAction, props } from '@ngrx/store';
import {
    ICreateUserCommand,
    ServerResponse,
    UserDto,
    UserListDto,
} from '../../../../web-api-client';

export const featureKey = 'user';
// Load users
export const LOAD_USERS = `[User] Load Users`;
export const LOAD_USERS_SUCCESS = `[User] Load Users Success`;

export const loadUsers = createAction(LOAD_USERS);
export const loadUsersSuccess = createAction(
    LOAD_USERS_SUCCESS,
    props<{ payload: UserListDto[] }>()
);

export const CREATE_USER = `[User] Create User`;
export const CREATE_USER_SUCCESS = `[User] Create User Success`;

export const createUser = createAction(
    CREATE_USER,
    props<{ payload: ICreateUserCommand }>()
);
export const createUserSuccess = createAction(
    CREATE_USER_SUCCESS,
    props<{ payload: UserDto }>()
);

export const UPDATE_USER = `[User] Update User`;
export const DELETE_USER = `[User] Delete User`;

export const LOAD_ROLES = `[User] Load Roles`;
export const LOAD_ROLES_SUCCESS = `[User] Load Roles Success`;

export const loadRoles = createAction(LOAD_ROLES);
export const loadRolesSuccess = createAction(
    LOAD_ROLES_SUCCESS,
    props<{ payload: string[] }>()
);

// Set feedback
export const SET_FEEDBACK = '[Institutions] Set Feedback';
export const CLEAR_FEEDBACK = '[Institutions] Clear Feedback';

export const setFeedback = createAction(
    SET_FEEDBACK,
    props<{ payload: ServerResponse }>()
);

export const clearFeedback = createAction(CLEAR_FEEDBACK);
