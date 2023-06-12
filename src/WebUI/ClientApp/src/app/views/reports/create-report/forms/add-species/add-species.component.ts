import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReportState } from 'app/modules/reports/store';
import { addSpecies } from 'app/modules/reports/store/actions';
import { getReportsLoading } from 'app/modules/reports/store/selectors';
import { IAddSpeciesCommand } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-add-species',
    templateUrl: './add-species.component.html',
    styleUrls: ['./add-species.component.scss'],
})
export class AddSpeciesComponent {
    @Output() close = new EventEmitter();
    speciesForm: FormGroup;
    loading$: Observable<boolean>;

    constructor(
        private store: Store<ReportState>,
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
        this.loading$ = this.store.select(getReportsLoading);
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

    onCancel() {
        this.speciesForm.reset();
        this.close.emit();
    }

    submit() {
        const payload: IAddSpeciesCommand = {
            name: this.f.name,
        };

        this.store.dispatch(addSpecies({ payload }));
        this.close.emit();
    }
}
