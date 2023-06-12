import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
    CreateUserClient,
    CreateUserCommand,
    DeleteUserClient,
    DeleteUserCommand,
    GetSystemRolesClient,
    GetUsersClient,
    ICreateUserCommand,
    IDeleteUserCommand,
} from '../web-api-client';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    deleteUserClient: DeleteUserClient;
    getUsers: GetUsersClient;
    getSystemRoles: GetSystemRolesClient;
    createUserCommand: CreateUserClient;

    constructor(http: HttpClient) {
        this.deleteUserClient = new DeleteUserClient(http);
        this.getUsers = new GetUsersClient(http);
        this.getSystemRoles = new GetSystemRolesClient(http);
        this.createUserCommand = new CreateUserClient(http);
    }

    getAllUsers() {
        return this.getUsers.handle();
    }

    getRoles() {
        return this.getSystemRoles.handle();
    }

    createUser(payload: ICreateUserCommand): Observable<any> {
        return this.createUserCommand.handle(new CreateUserCommand(payload));
    }

    deleteUser(payload: IDeleteUserCommand) {
        return this.deleteUserClient.handle(new DeleteUserCommand(payload));
    }
}
