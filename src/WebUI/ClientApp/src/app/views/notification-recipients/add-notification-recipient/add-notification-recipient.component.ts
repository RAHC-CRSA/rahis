import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { InstitutionsState } from 'app/modules/institutions/store';
import { addInstitution } from 'app/modules/institutions/store/actions';
import { NotificationRecipientsState } from 'app/modules/notification-recipients/store';
import { addNotificationRecipient } from 'app/modules/notification-recipients/store/actions';
import {
    getFeedback,
    getRecipientsLoading,
} from 'app/modules/notification-recipients/store/selectors';
import {
    IAddInstitutionCommand,
    IAddRecipientCommand,
    ServerResponse,
} from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-add-notification-recipient',
    templateUrl: './add-notification-recipient.component.html',
    styleUrls: ['./add-notification-recipient.component.scss'],
    animations: fuseAnimations,
})
export class AddNotificationRecipientComponent {
    notificationRecipientForm: FormGroup;
    loading$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<NotificationRecipientsState>
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.initData();
    }

    initData() {
        this.loading$ = this.store.select(getRecipientsLoading);
        this.feedback$ = this.store.select(getFeedback);
    }

    initForm() {
        this.notificationRecipientForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: [
                null,
                [
                    Validators.required,
                    Validators.email,
                    Validators.minLength(3),
                    Validators.maxLength(320),
                ],
            ],
            institution: [''],
            isEnabled: [true, [Validators.required]],
        });
    }

    get f() {
        return this.notificationRecipientForm.value;
    }

    submit() {
        const payload: IAddRecipientCommand = {
            name: this.f.name,
            email: this.f.email,
            institution: this.f.institution,
            isEnabled: this.f.isEnabled,
        };

        this.store.dispatch(addNotificationRecipient({ payload }));
    }
}
