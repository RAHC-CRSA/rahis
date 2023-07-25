import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { InstitutionsState } from 'app/modules/institutions/store';
import { addInstitution } from 'app/modules/institutions/store/actions';
import {
    getFeedback,
    getInstitutionsLoading,
} from 'app/modules/institutions/store/selectors';
import { IAddInstitutionCommand, ServerResponse } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-add-institution',
    templateUrl: './add-institution.component.html',
    styleUrls: ['./add-institution.component.scss'],
    animations: fuseAnimations,
})
export class AddInstitutionComponent implements OnInit {
    institutionForm: FormGroup;
    loading$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<InstitutionsState>
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.initData();
    }

    initData() {
        this.loading$ = this.store.select(getInstitutionsLoading);
        this.feedback$ = this.store.select(getFeedback);
    }

    initForm() {
        this.institutionForm = this.formBuilder.group({
            name: ['', Validators.required],
            publicSector: ['', Validators.required],
            type: [''],
        });
    }

    get f() {
        return this.institutionForm.value;
    }

    submit() {
        const payload: IAddInstitutionCommand = {
            name: this.f.name,
            publicSector: this.f.publicSector,
            type: this.f.type,
        };

        this.store.dispatch(addInstitution({ payload }));
    }
}
