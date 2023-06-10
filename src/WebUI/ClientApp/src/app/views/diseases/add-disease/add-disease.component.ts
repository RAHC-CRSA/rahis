import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { DiseaseState } from 'app/modules/diseases/store';
import { addDisease } from 'app/modules/diseases/store/actions';
import {
    getDiseasesLoading,
    getFeedback,
} from 'app/modules/diseases/store/selectors';
import { IAddDiseaseCommand, ServerResponse } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-add-disease',
    templateUrl: './add-disease.component.html',
    styleUrls: ['./add-disease.component.scss'],
    animations: fuseAnimations,
})
export class AddDiseaseComponent {
    diseaseForm: FormGroup;
    loading$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<DiseaseState>
    ) {}

    get f() {
        return this.diseaseForm?.value;
    }

    ngOnInit() {
        this.initForm();
        this.initData();
    }

    initData() {
        this.loading$ = this.store.select(getDiseasesLoading);
        this.feedback$ = this.store.select(getFeedback);
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
