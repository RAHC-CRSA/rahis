import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReportState } from 'app/modules/reports/store';
import { addInstitution } from 'app/modules/reports/store/actions';
import {
    getCountries,
    getReportsLoading,
} from 'app/modules/reports/store/selectors';
import { CountryDto, IAddInstitutionCommand } from 'app/web-api-client';
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-add-institution',
    templateUrl: './add-institution.component.html',
    styleUrls: ['./add-institution.component.scss'],
})
export class AddInstitutionComponent implements OnInit {
    @Input() country: number | null;
    @Output() close = new EventEmitter();
    institutionForm: FormGroup;
    loading$: Observable<boolean>;

    countryControl = new FormControl();

    selectedCountry: CountryDto;

    countries$: Observable<CountryDto[] | null | undefined>;
    countries: CountryDto[];
    filteredCountries: Observable<CountryDto[]>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<ReportState>
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.initData();
    }

    initData() {
        this.loading$ = this.store.select(getReportsLoading);
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

            if (this.country) {
                const country = this.countries.find(
                    (c) => c.id == this.country
                );

                this.selectedCountry = country;
                this.countryControl.setValue(country, { emitEvent: true });

                this.institutionForm.patchValue({ country: country.id });
            }
        });
    }

    initForm() {
        this.institutionForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            publicSector: ['', [Validators.required]],
            type: [''],
            country: [this.country, Validators.required],
        });
    }

    get f() {
        return this.institutionForm.controls;
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

    onCancel() {
        this.institutionForm.reset();
        this.close.emit();
    }

    onSubmit() {
        const payload: IAddInstitutionCommand = {
            name: this.f.name.value,
            publicSector: this.f.publicSector.value,
            type: this.f.type.value,
            countryId: this.f.country.value,
        };

        this.store.dispatch(addInstitution({ payload }));
        this.close.emit(payload);
    }
}
