import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InstitutionsState } from 'app/modules/institutions/store';
import { addInstitution } from 'app/modules/institutions/store/actions';
import { IAddInstitutionCommand } from 'app/web-api-client';

@Component({
    selector: 'app-add-institution',
    templateUrl: './add-institution.component.html',
    styleUrls: ['./add-institution.component.scss'],
})
export class AddInstitutionComponent {
    institutionForm: FormGroup;
    hasError: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<InstitutionsState>
    ) {}

    ngOnInit(): void {
        this.initForm();
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
