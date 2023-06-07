import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
    CreateUserClient,
    CreateUserCommand,
    GetSystemRolesClient,
    GetUsersClient,
    ICreateUserCommand,
} from '../web-api-client';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    getUsers: GetUsersClient;
    getSystemRoles: GetSystemRolesClient;
    createUserCommand: CreateUserClient;

    constructor(private http: HttpClient) {
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

    createUser(command: ICreateUserCommand): Observable<any> {
        const notFoundError = new Error('Not Found');
        if (!command) {
            return of(notFoundError);
        }

        const request: CreateUserCommand = new CreateUserCommand({
            firstName: command.firstName,
            lastName: command.lastName,
            email: command.email,
            username: command.username,
            password: command.password,
            roles: command.roles,
        });

        return this.createUserCommand.handle(request);
    }
}
