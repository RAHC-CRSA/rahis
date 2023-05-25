import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { UserModel as User } from 'src/app/models';
import {
  ICreateAuthTokenCommand,
  ServerResponse,
} from 'src/app/web-api-client';
import { loadUser, login } from '../../store/actions/auth.actions';
import { AuthState } from '../../store/reducers';
import { getFeedback, getUserLoading } from '../../store/selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  defaultAuth: any = {
    username: '',
    password: '',
  };

  loginForm: FormGroup;
  hasFeedback: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  feedback$: Observable<ServerResponse | null | undefined>;
  user: User;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AuthState>
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.isLoading$ = this.store.select(getUserLoading);
    this.feedback$ = this.store
      .select(getFeedback)
      .pipe(tap((feedback) => (this.hasFeedback = feedback != null)));
    this.store.dispatch(loadUser());

    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm?.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: [
        this.defaultAuth.username,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    const credentials: ICreateAuthTokenCommand = {
      username: this.f?.username.value,
      password: this.f?.password.value,
    };
    this.store.dispatch(login({ payload: credentials }));
  }
}
