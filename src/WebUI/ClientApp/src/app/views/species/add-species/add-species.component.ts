import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { SpeciesState } from 'app/modules/species/store';
import { addSpecies } from 'app/modules/species/store/actions';
import {
    getFeedback,
    getSpeciesLoading,
} from 'app/modules/species/store/selectors';
import { IAddSpeciesCommand, ServerResponse } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-add-species',
    templateUrl: './add-species.component.html',
    styleUrls: ['./add-species.component.scss'],
    animations: fuseAnimations,
})
export class AddSpeciesComponent {
    speciesForm: FormGroup;
    loading$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    constructor(
        private store: Store<SpeciesState>,
        private formBuilder: FormBuilder
    ) {}

    get f() {
        return this.speciesForm?.value;
    }

    ngOnInit() {
        this.initForm();
        this.initData();
    }

    initData() {
        this.loading$ = this.store.select(getSpeciesLoading);
        this.feedback$ = this.store.select(getFeedback);
    }

    initForm() {
        this.speciesForm = this.formBuilder.group({
            name: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                ]),
            ],
        });
    }

    submit() {
        const payload: IAddSpeciesCommand = {
            name: this.f.name,
        };

        this.store.dispatch(addSpecies({ payload }));
    }
}
