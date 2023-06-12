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
import { loadDiseases, loadSpecies } from 'app/modules/reports/store/actions';
import { getDiseases, getSpecies } from 'app/modules/reports/store/selectors';
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

    otherOption: string = 'Other';
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

        this.diseases$ = this.store.select(getDiseases);
        this.diseases$.subscribe((diseases) => {
            this.diseases = [
                ...diseases,
                new DiseaseDto({ id: null, name: this.otherOption }),
            ];

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
        });

        this.store.dispatch(loadSpecies());

        this.species$ = this.store.select(getSpecies);
        this.species$.subscribe((species) => {
            this.species = [
                ...species,
                new SpeciesDto({ id: null, name: this.otherOption }),
            ];

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

        this.newDisease =
            disease.name.toLowerCase() == this.otherOption.toLowerCase();

        this.diseaseInfo.patchValue({ disease: disease.id });

        if (this.newDisease) this.diseaseControl.disable();
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

        this.newSpecies =
            species.name.toLowerCase() == this.otherOption.toLowerCase();

        this.diseaseInfo.patchValue({ species: species.id });

        if (this.newSpecies) this.speciesControl.disable();
    }

    onCheckSpecies(isNew: boolean) {
        this.newSpecies = isNew;

        if (!this.newSpecies) {
            this.speciesControl.enable();
        }
    }

    onAddSpeciesClosed() {
        this.onCheckSpecies(false);
        this.speciesControl.setValue('', { emitEvent: true });
        this.diseaseInfo.patchValue({ species: '' }, { emitEvent: true });
    }

    onPrevious() {
        this.previous.emit();
    }

    onSubmit() {
        this.submit.emit(this.diseaseInfo.value);
    }
}
