import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createUser, loadRoles } from '../../store/actions';
import {
  CustomValidators,
  PasswordValidation,
} from '../../../../common/validators';
import { getRoles, UserState } from '../../store/reducers';
import { ICreateUserCommand } from 'src/app/web-api-client';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  userForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;

  roles$: Observable<string[] | null | undefined>;

  constructor(private fb: FormBuilder, private store: Store<UserState>) {}

  ngOnInit() {
    this.initForm();

    this.store.dispatch(loadRoles());
    this.roles$ = this.store.select(getRoles);
  }

  get f() {
    return this.userForm?.value;
  }

  initForm() {
    this.userForm = this.fb.group(
      {
        firstName: [
          null,
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ],
        lastName: [
          null,
          Validators.compose([Validators.required, Validators.minLength(3)]),
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
            PasswordValidation.PasswordRule,
          ]),
        ],
        confirmPassword: [null, Validators.compose([Validators.required])],
      },
      {
        validator: CustomValidators.confirmedValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  submit() {
    const payload: ICreateUserCommand = {
      firstName: this.f.firstName,
      lastName: this.f.lastName,
      username: this.f.email,
      email: this.f.email,
      password: this.f.password,
      roles: [this.f.role],
    };

    this.store.dispatch(createUser({ payload }));
  }
}
