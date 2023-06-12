import { Component } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { DiseaseState } from 'app/modules/diseases/store';
import { addDisease, loadSpecies } from 'app/modules/diseases/store/actions';
import {
    getDiseasesLoading,
    getFeedback,
    getSpecies,
} from 'app/modules/diseases/store/selectors';
import {
    IAddDiseaseCommand,
    ServerResponse,
    SpeciesDto,
} from 'app/web-api-client';
import { Observable, map, startWith } from 'rxjs';

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

    speciesControl = new FormControl();

    selectedSpecies: SpeciesDto;

    species$: Observable<SpeciesDto[] | null | undefined>;
    species: SpeciesDto[];
    filteredSpecies: Observable<SpeciesDto[]>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<DiseaseState>
    ) {}

    get f() {
        return this.diseaseForm?.controls;
    }

    ngOnInit() {
        this.initForm();
        this.initData();
    }

    initData() {
        this.store.dispatch(loadSpecies());
        this.species$ = this.store.select(getSpecies);
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
        });

        this.loading$ = this.store.select(getDiseasesLoading);
        this.feedback$ = this.store.select(getFeedback);
    }

    initForm() {
        this.diseaseForm = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(3)]],
            code: [null],
            classification: [null],
            zoonotic: [null, [Validators.required]],
            species: [null, [Validators.required]],
        });
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

        this.diseaseForm.patchValue({ species: species.id });
    }

    submit() {
        const payload: IAddDiseaseCommand = {
            name: this.f.name.value,
            code: this.f.code.value,
            classification: this.f.classification.value,
            zoonotic: this.f.zoonotic.value,
            speciesId: this.f.species.value,
        };

        this.store.dispatch(addDisease({ payload }));
    }
}
