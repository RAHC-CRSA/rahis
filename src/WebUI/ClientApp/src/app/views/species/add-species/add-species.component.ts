import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SpeciesState } from 'app/modules/species/store';
import { addSpecies } from 'app/modules/species/store/actions';
import { IAddSpeciesCommand } from 'app/web-api-client';

@Component({
    selector: 'app-add-species',
    templateUrl: './add-species.component.html',
    styleUrls: ['./add-species.component.scss'],
})
export class AddSpeciesComponent {
    speciesForm: FormGroup;

    constructor(
        private store: Store<SpeciesState>,
        private formBuilder: FormBuilder
    ) {}

    get f() {
        return this.speciesForm?.value;
    }

    ngOnInit() {
        this.initForm();
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
