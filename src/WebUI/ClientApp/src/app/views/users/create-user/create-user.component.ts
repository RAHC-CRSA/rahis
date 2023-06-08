import { Component } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { PasswordValidator } from 'app/common/validators';
import { getRoles } from 'app/core/auth/store/selectors';
import { UserState } from 'app/modules/users/store';
import { createUser, loadRoles } from 'app/modules/users/store/actions';
import { ICreateUserCommand } from 'app/web-api-client';
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
    userForm: FormGroup;
    hasError: boolean;
    isLoading$: Observable<boolean>;

    roleControl = new FormControl();

    selectedRole: string;

    roles$: Observable<string[] | null | undefined>;
    roles: string[];
    filteredRoles: Observable<string[]>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<UserState>
    ) {}

    ngOnInit() {
        this.initForm();
        this.initData();
    }

    get f() {
        return this.userForm?.controls;
    }

    initData() {
        this.store.dispatch(loadRoles());
        this.roles$ = this.store.select(getRoles);
        this.roles$.subscribe((roles) => {
            this.roles = roles;

            this.filteredRoles = this.roleControl.valueChanges.pipe(
                startWith(''),
                map((role) => this._filterRole(role || ''))
            );
        });
    }

    initForm() {
        this.userForm = this.formBuilder.group({
            firstName: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                ]),
            ],
            lastName: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                ]),
            ],
            role: [null, Validators.compose([Validators.required])],
            email: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.email,
                    Validators.minLength(3),
                    Validators.maxLength(320),
                ]),
            ],
            password: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(100),
                    PasswordValidator.PasswordRule,
                ]),
            ],
            confirmPassword: [
                null,
                Validators.compose([
                    Validators.required,
                    PasswordValidator.PasswordMatch,
                ]),
            ],
        });
    }

    private _filterRole(name: string): string[] {
        return this.roles?.filter((option) =>
            option.toLowerCase().includes(name.toLowerCase())
        );
    }

    displayRoleFn(role: string): string {
        return role ?? '';
    }

    updateSelectedRole(event: any) {
        this.selectedRole = event.option.value;
        const role: string = event.option.value;

        this.userForm.patchValue({ role });
    }

    submit() {
        const payload: ICreateUserCommand = {
            firstName: this.f.firstName.value,
            lastName: this.f.lastName.value,
            username: this.f.email.value,
            email: this.f.email.value,
            password: this.f.password.value,
            roles: [this.f.role.value],
        };

        this.store.dispatch(createUser({ payload }));
    }
}
