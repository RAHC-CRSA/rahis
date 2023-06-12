import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReportState } from 'app/modules/reports/store';
import { addInstitution } from 'app/modules/reports/store/actions';
import { getReportsLoading } from 'app/modules/reports/store/selectors';
import { IAddInstitutionCommand } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-add-institution',
    templateUrl: './add-institution.component.html',
    styleUrls: ['./add-institution.component.scss'],
})
export class AddInstitutionComponent implements OnInit {
    @Output() close = new EventEmitter();
    institutionForm: FormGroup;
    loading$: Observable<boolean>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<ReportState>
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.initData();
    }

    initData() {
        this.loading$ = this.store.select(getReportsLoading);
    }

    initForm() {
        this.institutionForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            publicSector: ['', [Validators.required]],
            type: [''],
        });
    }

    get f() {
        return this.institutionForm.controls;
    }

    onCancel() {
        this.institutionForm.reset();
        this.close.emit();
    }

    onSubmit() {
        const payload: IAddInstitutionCommand = {
            name: this.f.name.value,
            publicSector: this.f.publicSector.value,
            type: this.f.type.value,
        };

        this.store.dispatch(addInstitution({ payload }));
        this.close.emit(payload);
    }
}
