import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable, finalize } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthState } from 'app/core/auth/store';
import { Store } from '@ngrx/store';
import { IResetPasswordCommand, ServerResponse } from 'app/web-api-client';
import { resetPassword } from 'app/core/auth/store/actions/auth.actions';
import { getUser } from 'app/core/auth/store/selectors';

@Component({
    selector: 'auth-forgot-password',
    templateUrl: './forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthForgotPasswordComponent implements OnInit {
    forgotPasswordForm: FormGroup;
    feedback$: Observable<ServerResponse | null | undefined>;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private store: Store<AuthState>
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    sendResetLink(): void {
        const payload: IResetPasswordCommand = {
            email: this.forgotPasswordForm.controls.email.value,
        };
        this.store.dispatch(resetPassword({ payload }));
    }
}
