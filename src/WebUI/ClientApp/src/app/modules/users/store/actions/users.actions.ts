import { createAction, props } from '@ngrx/store';
import {
    CountryDto,
    ICreateUserCommand,
    IDeleteUserCommand,
    ServerResponse,
    UserListDto,
} from '../../../../web-api-client';

export const featureKey = 'user';
// Load users
export const LOAD_USERS = `[Users] Load Users`;
export const LOAD_USERS_SUCCESS = `[Users] Load Users Success`;

export const loadUsers = createAction(LOAD_USERS);
export const loadUsersSuccess = createAction(
    LOAD_USERS_SUCCESS,
    props<{ payload: UserListDto[] }>()
);

// Get countries
export const LOAD_COUNTRIES = `[Users] Load Countries`;
export const LOAD_COUNTRIES_SUCCESS = `[Users] Load Countries Success`;

export const loadCountries = createAction(LOAD_COUNTRIES);
export const loadCountriesSuccess = createAction(
    LOAD_COUNTRIES_SUCCESS,
    props<{ payload: CountryDto[] }>()
);

export const CREATE_USER = `[Users] Create User`;
export const CREATE_USER_SUCCESS = `[Users] Create User Success`;

export const createUser = createAction(
    CREATE_USER,
    props<{ payload: ICreateUserCommand }>()
);
export const createUserSuccess = createAction(
    CREATE_USER_SUCCESS,
    props<{ payload: UserListDto }>()
);

// Update user
export const UPDATE_USER = `[Users] Update User`;

// Delete user
export const DELETE_USER = `[Users] Delete User`;
export const DELETE_USER_SUCCESS = `[Users] Delete User Success`;

export const deleteUser = createAction(
    DELETE_USER,
    props<{ payload: IDeleteUserCommand }>()
);
export const deleteUserSuccess = createAction(
    DELETE_USER_SUCCESS,
    props<{ payload: string }>()
);

export const LOAD_ROLES = `[Users] Load Roles`;
export const LOAD_ROLES_SUCCESS = `[Users] Load Roles Success`;

export const loadRoles = createAction(LOAD_ROLES);
export const loadRolesSuccess = createAction(
    LOAD_ROLES_SUCCESS,
    props<{ payload: string[] }>()
);

// Set feedback
export const SET_FEEDBACK = '[Users] Set Feedback';
export const CLEAR_FEEDBACK = '[Users] Clear Feedback';

export const setFeedback = createAction(
    SET_FEEDBACK,
    props<{ payload: ServerResponse }>()
);

export const clearFeedback = createAction(CLEAR_FEEDBACK);
