import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
    getUserLoading,
    getFeedback,
    getUser,
} from 'app/core/auth/store/selectors';
import { PasswordValidator } from 'app/common/validators';
import { AuthState } from 'app/core/auth/store';
import {
    AuthResponseDto,
    IUpdateProfileCommand,
    ServerResponse,
} from 'app/web-api-client';
import { Observable } from 'rxjs';
import { updateProfile } from 'app/core/auth/store/actions/auth.actions';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;
    user: AuthResponseDto;
    loading$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    constructor(
        private store: Store<AuthState>,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.initData();
        this.initForm();
    }

    get f() {
        return this.profileForm?.controls;
    }

    initData() {
        this.store.select(getUser).subscribe((user) => {
            if (user != null) this.user = user;

            console.log({ user });
        });
        this.loading$ = this.store.select(getUserLoading);
        this.feedback$ = this.store.select(getFeedback);
    }

    initForm() {
        this.profileForm = this.formBuilder.group({
            email: [
                this.user?.username,
                Validators.compose([
                    Validators.required,
                    Validators.email,
                    Validators.minLength(3),
                    Validators.maxLength(320),
                ]),
            ],
            password: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(100),
                    PasswordValidator.PasswordRule,
                ]),
            ],
            confirmPassword: [
                '',
                Validators.compose([
                    Validators.required,
                    PasswordValidator.PasswordMatch,
                ]),
            ],
        });
    }

    submit() {
        const payload: IUpdateProfileCommand = {
            username: this.f.email.value,
            email: this.f.email.value,
            password: this.f.password.value,
        };

        this.store.dispatch(updateProfile({ payload }));
    }
}
