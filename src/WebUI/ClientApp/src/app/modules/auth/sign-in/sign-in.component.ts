import {
    Component,
    OnChanges,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/core/auth/store';
import {
    clearFeedback,
    loadUser,
    login,
} from 'app/core/auth/store/actions/auth.actions';
import {
    getFeedback,
    getUser,
    getUserLoading,
} from 'app/core/auth/store/selectors';
import { ICreateAuthTokenCommand, ServerResponse } from 'app/web-api-client';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    signInForm: FormGroup;
    defaultAuth: any = {
        username: '',
        password: '',
    };
    hasFeedback: boolean;
    redirectUrl: string;
    loading$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _store: Store<AuthState>
    ) {
        // get return url from route parameters or default to '/'
        this.redirectUrl =
            this._activatedRoute.snapshot.queryParams[
                'redirectURL'.toString()
            ] || '/';

        // Redirect if logged in
        this._store.select(getUser).subscribe((user) => {
            if (user) this._router.navigateByUrl(this.redirectUrl);
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.initForm();

        this.loading$ = this._store.select(getUserLoading);
        this.feedback$ = this._store.select(getFeedback);
        this.feedback$.pipe(
            map((feedback) => {
                console.log(feedback);
                this.hasFeedback = feedback != null;
            })
        );
    }

    initForm() {
        // Create the form
        this.signInForm = this._formBuilder.group({
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
            rememberMe: [''],
        });
    }

    get f() {
        return this.signInForm?.controls;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */

    submit() {
        this._store.dispatch(clearFeedback());
        const credentials: ICreateAuthTokenCommand = {
            username: this.f?.username.value,
            password: this.f?.password.value,
        };

        this._store.dispatch(
            login({ payload: credentials, redirectUrl: this.redirectUrl })
        );
    }
}
