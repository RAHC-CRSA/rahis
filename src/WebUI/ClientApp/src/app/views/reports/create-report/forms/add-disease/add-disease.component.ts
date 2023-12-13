import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReportState } from 'app/modules/reports/store';
import { addDisease } from 'app/modules/reports/store/actions';
import { getReportsLoading } from 'app/modules/reports/store/selectors';
import { IAddDiseaseCommand } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-add-disease',
    templateUrl: './add-disease.component.html',
    styleUrls: ['./add-disease.component.scss'],
})
export class AddDiseaseComponent {
    @Input() species: number;
    @Output() close = new EventEmitter();

    diseaseForm: FormGroup;
    loading$: Observable<boolean>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<ReportState>
    ) {}

    get f() {
        return this.diseaseForm?.controls;
    }

    ngOnInit() {
        this.initForm();
        this.initData();
    }

    initData() {
        this.loading$ = this.store.select(getReportsLoading);
    }

    initForm() {
        this.diseaseForm = this.formBuilder.group({
            name: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                ]),
            ],
            code: [''],
            classification: [''],
            zoonotic: ['', [Validators.required]],
            species: [this.species, [Validators.required]],
        });
    }

    onCancel() {
        this.diseaseForm.reset();
        this.close.emit();
    }

    onSubmit() {
        const payload: IAddDiseaseCommand = {
            name: this.f.name.value,
            code: this.f.code.value,
            classification: this.f.classification.value,
            isZoonotic: this.f.zoonotic.value,
            speciesId: this.f.species.value,
        };

        this.store.dispatch(addDisease({ payload }));
        this.close.emit();
    }
}
