import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { InstitutionsState } from 'app/modules/institutions/store';
import { addInstitution } from 'app/modules/institutions/store/actions';
import {
    getFeedback,
    getInstitutionsLoading,
} from 'app/modules/institutions/store/selectors';
import { loadCountries } from 'app/modules/regions/store/actions';
import { getCountries } from 'app/modules/regions/store/selectors/regions.selectors';
import {
    CountryDto,
    IAddInstitutionCommand,
    ServerResponse,
} from 'app/web-api-client';
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-add-institution',
    templateUrl: './add-institution.component.html',
    styleUrls: ['./add-institution.component.scss'],
    animations: fuseAnimations,
})
export class AddInstitutionComponent implements OnInit {
    institutionForm: FormGroup;
    loading$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    countryControl = new FormControl();

    selectedCountry: CountryDto;

    countries$: Observable<CountryDto[] | null | undefined>;
    countries: CountryDto[];
    filteredCountries: Observable<CountryDto[]>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<InstitutionsState>
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.initData();
    }

    initData() {
        this.store.dispatch(loadCountries());
        this.countries$ = this.store.select(getCountries);
        this.countries$.subscribe((countries) => {
            this.countries = countries;

            this.filteredCountries = this.countryControl.valueChanges.pipe(
                startWith({} as CountryDto),
                map((country) =>
                    country && typeof country === 'object'
                        ? country.name
                        : country
                ),
                map((name: string) =>
                    name ? this._filterCountry(name) : this.countries.slice()
                )
            );
        });

        this.loading$ = this.store.select(getInstitutionsLoading);
        this.feedback$ = this.store.select(getFeedback);
    }

    initForm() {
        this.institutionForm = this.formBuilder.group({
            name: ['', Validators.required],
            publicSector: ['', Validators.required],
            type: [''],
            country: ['', Validators.required],
        });
    }

    get f() {
        return this.institutionForm.value;
    }

    private _filterCountry(name: string): CountryDto[] {
        return this.countries.filter(
            (option) =>
                option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
        );
    }

    displayCountryFn(country: CountryDto): string {
        return country ? country.name : '';
    }

    updateSelectedCountry(event: any) {
        this.selectedCountry = event.option.value;
        const country: CountryDto = event.option.value;

        this.institutionForm.patchValue({ country: country.id });
    }

    submit() {
        const payload: IAddInstitutionCommand = {
            name: this.f.name,
            publicSector: this.f.publicSector,
            type: this.f.type,
            countryId: this.f.country.value,
        };

        this.store.dispatch(addInstitution({ payload }));
    }
}
