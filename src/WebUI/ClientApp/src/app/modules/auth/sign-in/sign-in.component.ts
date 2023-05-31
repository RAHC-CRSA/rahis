import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthState } from 'app/core/auth/store';
import {
    clearFeedback,
    loadUser,
    login,
} from 'app/core/auth/store/actions/auth.actions';
import { getFeedback, getUserLoading } from 'app/core/auth/store/selectors';
import { ICreateAuthTokenCommand, ServerResponse } from 'app/web-api-client';
import { Observable, map, tap } from 'rxjs';

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
    isLoading$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _store: Store<AuthState>
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.initForm();

        this.isLoading$ = this._store.select(getUserLoading);
        this.feedback$ = this._store.select(getFeedback);
        this.feedback$.pipe(
            map((feedback) => {
                console.log(feedback);
                this.hasFeedback = feedback != null;
            })
        );
        this._store.dispatch(loadUser());

        // get return url from route parameters or default to '/'
        this.redirectUrl =
            this._activatedRoute.snapshot.queryParams[
                'redirectURL'.toString()
            ] || '/';
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

    // signIn(): void {
    //     // Return if the form is invalid
    //     if (this.signInForm.invalid) {
    //         return;
    //     }

    //     // Disable the form
    //     this.signInForm.disable();

    //     // Hide the alert
    //     this.showAlert = false;

    //     // Sign in
    //     this._authService.signIn(this.signInForm.value).subscribe(
    //         () => {
    //             // Set the redirect url.
    //             // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
    //             // to the correct page after a successful sign in. This way, that url can be set via
    //             // routing file and we don't have to touch here.
    //             const redirectURL =
    //                 this._activatedRoute.snapshot.queryParamMap.get(
    //                     'redirectURL'
    //                 ) || '/signed-in-redirect';

    //             // Navigate to the redirect url
    //             this._router.navigateByUrl(redirectURL);
    //         },
    //         (response) => {
    //             // Re-enable the form
    //             this.signInForm.enable();

    //             // Reset the form
    //             this.signInNgForm.resetForm();

    //             // Set the alert
    //             this.alert = {
    //                 type: 'error',
    //                 message: 'Wrong email or password',
    //             };

    //             // Show the alert
    //             this.showAlert = true;
    //         }
    //     );
    // }
}
