import {
    AfterContentChecked,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReportState } from 'app/modules/reports/store';
import { addRegion, loadCountries } from 'app/modules/reports/store/actions';
import {
    getCountries,
    getReportsLoading,
} from 'app/modules/reports/store/selectors';
import { CountryDto, IAddRegionCommand } from 'app/web-api-client';
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-add-region',
    templateUrl: './add-region.component.html',
    styleUrls: ['./add-region.component.scss'],
})
export class AddRegionComponent implements OnInit, AfterContentChecked {
    @Input() country: number;
    @Output() close = new EventEmitter();

    countryControl = new FormControl();
    selectedCountry: CountryDto;

    countries$: Observable<CountryDto[] | null | undefined>;
    countries: CountryDto[];
    filteredCountries: Observable<CountryDto[]>;

    regionForm: FormGroup;

    loading$: Observable<boolean>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<ReportState>,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    ngOnInit() {
        console.log(this.country);
        this.initForm();
        this.initData();
    }

    initForm() {
        this.regionForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            code: [''],
            countryId: [this.country, [Validators.required]],
        });
    }

    initData() {
        this.store.dispatch(loadCountries());
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
        });
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

        this.regionForm.patchValue({ countryId: country.id });
    }

    get f() {
        return this.regionForm.controls;
    }

    onCancel() {
        this.regionForm.reset();
        this.close.emit();
    }

    onSubmit() {
        const payload: IAddRegionCommand = {
            name: this.f.name.value,
            code: this.f.name.value,
            countryId: this.f.countryId.value,
        };

        this.store.dispatch(addRegion({ payload }));
        this.regionForm.reset();

        this.close.emit();
    }
}
