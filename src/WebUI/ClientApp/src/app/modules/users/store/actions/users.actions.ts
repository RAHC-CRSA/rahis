import { createAction, props } from '@ngrx/store';
import {
  ICreateUserCommand,
  IUserDto,
  IUserListDto,
} from '../../../../web-api-client';

export const featureKey = 'user';
// Load users
export const LOAD_USERS = `[User] Load Users`;
export const LOAD_USERS_FAIL = `[User] Load Users Fail`;
export const LOAD_USERS_SUCCESS = `[User] Load Users Success`;

export const loadUsers = createAction(LOAD_USERS);
export const loadUsersFail = createAction(
  LOAD_USERS_FAIL,
  props<{ payload: string }>()
);
export const loadUsersSuccess = createAction(
  LOAD_USERS_SUCCESS,
  props<{ payload: IUserListDto[] }>()
);

export const CREATE_USER = `[User] Create User`;
export const CREATE_USER_FAIL = `[User] Create User Fail`;
export const CREATE_USER_SUCCESS = `[User] Create User Success`;

export const createUser = createAction(
  CREATE_USER,
  props<{ payload: ICreateUserCommand }>()
);
export const createUserFail = createAction(
  CREATE_USER_FAIL,
  props<{ payload: string }>()
);
export const createUserSuccess = createAction(
  CREATE_USER_SUCCESS,
  props<{ payload: IUserDto }>()
);

export const UPDATE_USER = `[User] Update User`;
export const DELETE_USER = `[User] Delete User`;

export const LOAD_ROLES = `[User] Load Roles`;
export const LOAD_ROLES_FAIL = `[User] Load Roles Fail`;
export const LOAD_ROLES_SUCCESS = `[User] Load Roles Success`;

export const loadRoles = createAction(LOAD_ROLES);
export const loadRolesFail = createAction(
  LOAD_ROLES_FAIL,
  props<{ payload: string }>()
);
export const loadRolesSuccess = createAction(
  LOAD_ROLES_SUCCESS,
  props<{ payload: string[] }>()
);
