import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DiseaseState } from 'app/modules/diseases/store';
import { addDisease } from 'app/modules/diseases/store/actions';
import { IAddDiseaseCommand } from 'app/web-api-client';

@Component({
    selector: 'app-add-disease',
    templateUrl: './add-disease.component.html',
    styleUrls: ['./add-disease.component.scss'],
})
export class AddDiseaseComponent {
    diseaseForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<DiseaseState>
    ) {}

    get f() {
        return this.diseaseForm?.value;
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.diseaseForm = this.formBuilder.group({
            name: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                ]),
            ],
            code: [null],
            classification: [null],
            zoonotic: [null, Validators.compose([Validators.required])],
        });
    }

    submit() {
        const payload: IAddDiseaseCommand = {
            name: this.f.name,
            code: this.f.code,
            classification: this.f.classification,
            zoonotic: this.f.zoonotic,
        };

        console.log({ payload });

        this.store.dispatch(addDisease({ payload }));
    }
}
