import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { ReportState } from 'app/modules/reports/store';
import {
    loadDiseases,
    loadSpecies,
    loadTransBoundaryDiseases,
} from 'app/modules/reports/store/actions';
import {
    getDiseases,
    getReportsLoaded,
    getSpecies,
} from 'app/modules/reports/store/selectors';
import { DiseaseDto, SpeciesDto } from 'app/web-api-client';
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-disease-info',
    templateUrl: './disease-info.component.html',
    styleUrls: ['./disease-info.component.scss'],
    animations: fuseAnimations,
})
export class DiseaseInfoComponent implements OnInit {
    @Input() formData: any;

    newSpecies: boolean = false;
    newDisease: boolean = false;

    diseaseControl = new FormControl();
    speciesControl = new FormControl();

    selectedDisease: DiseaseDto;
    selectedSpecies: SpeciesDto;

    diseases$: Observable<DiseaseDto[] | null | undefined>;
    diseases: DiseaseDto[];
    filteredDiseases: Observable<DiseaseDto[]>;

    species$: Observable<SpeciesDto[] | null | undefined>;
    species: SpeciesDto[];
    filteredSpecies: Observable<SpeciesDto[]>;

    @Output() previous = new EventEmitter();
    @Output() submit = new EventEmitter();

    loaded$: Observable<boolean>;

    diseaseInfo: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<ReportState>
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.initData();
    }

    initForm() {
        this.diseaseInfo = this.formBuilder.group({
            disease: [this.formData.disease, Validators.required],
            species: [this.formData.species, Validators.required],
        });
    }

    initData() {
        this.store.dispatch(loadDiseases());
        this.store.dispatch(loadSpecies());

        this.diseases$ = this.store.select(getDiseases);
        this.species$ = this.store.select(getSpecies);
        this.loaded$ = this.store.select(getReportsLoaded);

        this.diseases$.subscribe((diseases) => {
            this.diseases = diseases;

            this.filteredDiseases = this.diseaseControl.valueChanges.pipe(
                startWith({} as DiseaseDto),
                map((disease) =>
                    disease && typeof disease === 'object'
                        ? disease.name
                        : disease
                ),
                map((name: string) =>
                    name ? this._filterDisease(name) : this.diseases.slice()
                )
            );
            if (this.formData.disease && this.formData.disease >= 0) {
                this.selectedDisease =
                    this.diseases[
                        this.formData.disease == 0
                            ? this.formData.disease
                            : --this.formData.disease
                    ];
            }
        });

        this.species$.subscribe((species) => {
            this.species = species;

            this.filteredSpecies = this.speciesControl.valueChanges.pipe(
                startWith({} as SpeciesDto),
                map((species) =>
                    species && typeof species === 'object'
                        ? species.name
                        : species
                ),
                map((name: string) =>
                    name ? this._filterSpecies(name) : this.species.slice()
                )
            );
            if (this.formData.species && this.formData.species >= 0) {
                this.selectedSpecies =
                    this.species[
                        this.formData.species == 0
                            ? this.formData.species
                            : --this.formData.species
                    ];
            }
        });
    }

    private _filterDisease(name: string): DiseaseDto[] {
        return this.diseases.filter(
            (option) =>
                option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
        );
    }

    displayDiseaseFn(disease: DiseaseDto): string {
        return disease ? disease.name : '';
    }

    updateSelectedDisease(event: any) {
        this.selectedDisease = event.option.value;
        const disease: DiseaseDto = event.option.value;

        this.diseaseInfo.patchValue({ disease: disease.id });
    }

    onCheckDisease(isNew: boolean) {
        this.newDisease = isNew;

        if (!this.newDisease) {
            this.diseaseControl.enable();
        }
    }

    onAddDiseaseClosed() {
        this.onCheckDisease(false);
        this.diseaseControl.setValue('', { emitEvent: true });
        this.diseaseInfo.patchValue({ disease: '' }, { emitEvent: true });
    }

    private _filterSpecies(name: string): SpeciesDto[] {
        return this.species.filter(
            (option) =>
                option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
        );
    }

    displaySpeciesFn(species: SpeciesDto): string {
        return species ? species.name : '';
    }

    updateSelectedSpecies(event: any) {
        this.selectedSpecies = event.option.value;
        const species: SpeciesDto = event.option.value;

        this.diseaseControl.setValue('', { emitEvent: true });
        this.diseaseInfo.patchValue(
            { disease: undefined },
            { emitEvent: true }
        );

        this.diseaseInfo.patchValue({ species: species.id });
        this.store.dispatch(loadTransBoundaryDiseases({ payload: species.id }));
    }

    onCheckSpecies(isNew: boolean) {
        this.newSpecies = isNew;

        if (!this.newSpecies) {
            this.speciesControl.enable();
        }
    }

    onAddSpeciesClosed() {
        // this.onCheckSpecies(false);
        // this.speciesControl.setValue('', { emitEvent: true });
        // this.diseaseInfo.patchValue({ species: '' }, { emitEvent: true });
    }

    onPrevious() {
        this.previous.emit();
    }

    onSubmit() {
        this.submit.emit(this.diseaseInfo.value);
    }
}
