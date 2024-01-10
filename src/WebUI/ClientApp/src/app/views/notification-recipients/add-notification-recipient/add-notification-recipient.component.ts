import { Component } from '@angular/core';
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
import { NotificationRecipientsState } from 'app/modules/notification-recipients/store';
import { addNotificationRecipient } from 'app/modules/notification-recipients/store/actions';
import {
    getFeedback,
    getRecipientsLoading,
} from 'app/modules/notification-recipients/store/selectors';
import { loadCountries } from 'app/modules/regions/store/actions';
import { getCountries } from 'app/modules/regions/store/selectors/regions.selectors';
import {
    CountryDto,
    IAddInstitutionCommand,
    IAddRecipientCommand,
    ServerResponse,
} from 'app/web-api-client';
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-add-notification-recipient',
    templateUrl: './add-notification-recipient.component.html',
    styleUrls: ['./add-notification-recipient.component.scss'],
    animations: fuseAnimations,
})
export class AddNotificationRecipientComponent {
    countryControl = new FormControl();

    selectedCountry: CountryDto;

    countries$: Observable<CountryDto[] | null | undefined>;
    countries: CountryDto[];
    filteredCountries: Observable<CountryDto[]>;

    notificationRecipientForm: FormGroup;
    loading$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<NotificationRecipientsState>
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

        this.loading$ = this.store.select(getRecipientsLoading);
        this.feedback$ = this.store.select(getFeedback);
    }

    initForm() {
        this.notificationRecipientForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: [
                null,
                [
                    Validators.required,
                    Validators.email,
                    Validators.minLength(3),
                    Validators.maxLength(320),
                ],
            ],
            institution: [''],
            isEnabled: [true, [Validators.required]],
            country: ['', Validators.required],
        });
    }

    get f() {
        return this.notificationRecipientForm.value;
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

        this.notificationRecipientForm.patchValue({ country: country.id });
    }

    submit() {
        const payload: IAddRecipientCommand = {
            name: this.f.name,
            email: this.f.email,
            institution: this.f.institution,
            isEnabled: this.f.isEnabled,
            countryId: this.f.country.value,
        };

        this.store.dispatch(addNotificationRecipient({ payload }));
    }
}
