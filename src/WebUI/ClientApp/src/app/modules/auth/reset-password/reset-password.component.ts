import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable, finalize } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseValidators } from '@fuse/validators';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthState } from 'app/core/auth/store';
import { Store } from '@ngrx/store';
import {
    IResetPasswordCommand,
    ISetPasswordCommand,
    ServerResponse,
} from 'app/web-api-client';
import {
    getFeedback,
    getPasswordResetToken,
    getUser,
    getUserLoading,
} from 'app/core/auth/store/selectors';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { setPassword } from 'app/core/auth/store/actions/auth.actions';

@Component({
    selector: 'auth-reset-password',
    templateUrl: './reset-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthResetPasswordComponent implements OnInit {
    token: string;
    resetPasswordForm: FormGroup;
    loading$: Observable<boolean | null | undefined>;
    feedback$: Observable<ServerResponse | null | undefined>;

    /**
     * Constructor
     */
    constructor(
        private store: Store<AuthState>,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */

    ngOnInit() {
        this.route.queryParamMap.subscribe((params: ParamMap) => {
            this.token = params.get('token');
            console.log(this.token);
        });
        this.initData();
        this.initForm();
    }

    initData() {
        this.loading$ = this.store.select(getUserLoading);
        this.feedback$ = this.store.select(getFeedback);
    }

    initForm() {
        // Create the form
        this.resetPasswordForm = this.formBuilder.group(
            {
                password: ['', Validators.required],
                passwordConfirm: ['', Validators.required],
            },
            {
                validators: FuseValidators.mustMatch(
                    'password',
                    'passwordConfirm'
                ),
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Reset password
     */
    resetPassword(): void {
        // Disable the form
        this.resetPasswordForm.disable();

        // Send the request to the server
        const payload: ISetPasswordCommand = {
            resetToken: this.token,
            password: this.resetPasswordForm.controls.password.value,
        };

        this.store.dispatch(setPassword({ payload }));
    }
}
