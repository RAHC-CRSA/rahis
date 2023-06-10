import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReportState } from 'app/modules/reports/store';
import { addInstitution } from 'app/modules/reports/store/actions';
import { IAddInstitutionCommand } from 'app/web-api-client';

@Component({
    selector: 'app-add-institution',
    templateUrl: './add-institution.component.html',
    styleUrls: ['./add-institution.component.scss'],
})
export class AddInstitutionComponent implements OnInit {
    institutionForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<ReportState>
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
        return this.institutionForm.controls;
    }

    submit() {
        const payload: IAddInstitutionCommand = {
            name: this.f.name.value,
            publicSector: this.f.publicSector.value,
            type: this.f.type.value,
        };

        this.store.dispatch(addInstitution({ payload }));
    }
}
