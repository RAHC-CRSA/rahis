import { Component } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { RegionsState } from 'app/modules/regions/store';
import { addRegion, loadCountries } from 'app/modules/regions/store/actions';
import {
    getCountries,
    getFeedback,
    getRegionsLoading,
} from 'app/modules/regions/store/selectors/regions.selectors';
import {
    CountryDto,
    IAddRegionCommand,
    ServerResponse,
} from 'app/web-api-client';
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-add-region',
    templateUrl: './add-region.component.html',
    styleUrls: ['./add-region.component.scss'],
    animations: fuseAnimations,
})
export class AddRegionComponent {
    regionForm: FormGroup;
    loading$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    countryControl = new FormControl();

    selectedCountry: CountryDto;

    countries$: Observable<CountryDto[] | null | undefined>;
    countries: CountryDto[];
    filteredCountries: Observable<CountryDto[]>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<RegionsState>
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.initData();
    }

    initForm() {
        this.regionForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            code: [''],
            country: ['', [Validators.required]],
        });
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

        this.loading$ = this.store.select(getRegionsLoading);
        this.feedback$ = this.store.select(getFeedback);
    }

    get f() {
        return this.regionForm?.controls;
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

        this.regionForm.patchValue({ country: country.id });
    }

    submit() {
        const payload: IAddRegionCommand = {
            name: this.f.name.value,
            code: this.f.code.value,
            countryId: this.f.country.value,
        };

        this.store.dispatch(addRegion({ payload }));
    }
}
