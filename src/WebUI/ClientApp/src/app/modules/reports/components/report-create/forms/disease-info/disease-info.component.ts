import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReportsState } from '../../../../store';
import { loadDiseases, loadSpecies } from '../../../../store/actions';
import { getDiseases, getSpecies } from '../../../../store/reducers';
import { DiseaseDto, SpeciesDto } from '../../../../../../web-api-client';

@Component({
    selector: 'app-disease-info',
    templateUrl: './disease-info.component.html',
    styleUrls: ['./disease-info.component.scss'],
})
export class DiseaseInfoComponent implements OnInit {
    @Input() formData: any;
    diseases$: Observable<DiseaseDto[] | null | undefined>;
    species$: Observable<SpeciesDto[] | null | undefined>;

    @Output() previous = new EventEmitter();
    @Output() submit = new EventEmitter();

    diseaseInfo: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<ReportsState>
    ) {}

    ngOnInit() {
        this.formInit();

        this.store.dispatch(loadDiseases());
        this.store.dispatch(loadSpecies());

        this.diseases$ = this.store.select(getDiseases);
        this.species$ = this.store.select(getSpecies);
    }

    formInit() {
        this.diseaseInfo = this.formBuilder.group({
            disease: [this.formData.disease, Validators.required],
            species: [this.formData.species, Validators.required],
        });
    }

    onPrevious() {
        this.previous.emit();
    }

    onSubmit() {
        this.submit.emit(this.diseaseInfo.value);
    }
}
