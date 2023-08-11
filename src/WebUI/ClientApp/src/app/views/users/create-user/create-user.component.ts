import { Component } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { PasswordValidator } from 'app/common/validators';
import { UserState } from 'app/modules/users/store';
import {
    createUser,
    loadCountries,
    loadRoles,
} from 'app/modules/users/store/actions';
import {
    getCountries,
    getFeedback,
    getRoles,
    getUsersLoading,
} from 'app/modules/users/store/selectors';
import {
    CountryDto,
    ICreateUserCommand,
    ServerResponse,
} from 'app/web-api-client';
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss'],
    animations: fuseAnimations,
})
export class CreateUserComponent {
    userForm: FormGroup;
    loading$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    roleControl = new FormControl();

    selectedRole: string;

    roles$: Observable<string[] | null | undefined>;
    roles: string[];
    filteredRoles: Observable<string[]>;

    countryControl = new FormControl();

    selectedCountry: CountryDto;

    countries$: Observable<CountryDto[] | null | undefined>;
    countries: CountryDto[];
    filteredCountries: Observable<CountryDto[]>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<UserState>
    ) {}

    ngOnInit() {
        this.initForm();
        this.initData();
    }

    get f() {
        return this.userForm?.controls;
    }

    initData() {
        this.store.dispatch(loadRoles());
        this.roles$ = this.store.select(getRoles);
        this.roles$.subscribe((roles) => {
            this.roles = roles;

            this.filteredRoles = this.roleControl.valueChanges.pipe(
                startWith(''),
                map((role) => this._filterRole(role || ''))
            );
        });

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

        this.loading$ = this.store.select(getUsersLoading);
        this.feedback$ = this.store.select(getFeedback);
    }

    initForm() {
        this.userForm = this.formBuilder.group({
            firstName: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                ]),
            ],
            lastName: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                ]),
            ],
            role: [null, Validators.compose([Validators.required])],
            country: [null, Validators.compose([Validators.required])],
            email: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.email,
                    Validators.minLength(3),
                    Validators.maxLength(320),
                ]),
            ],
            password: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(100),
                    PasswordValidator.PasswordRule,
                ]),
            ],
            confirmPassword: [
                null,
                Validators.compose([
                    Validators.required,
                    PasswordValidator.PasswordMatch,
                ]),
            ],
        });
    }

    private _filterRole(name: string): string[] {
        return this.roles?.filter((option) =>
            option.toLowerCase().includes(name.toLowerCase())
        );
    }

    displayRoleFn(role: string): string {
        return role ?? '';
    }

    updateSelectedRole(event: any) {
        this.selectedRole = event.option.value;
        const role: string = event.option.value;

        this.userForm.patchValue({ role });
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

        this.userForm.patchValue({ country: country.id });
    }

    submit() {
        const payload: ICreateUserCommand = {
            firstName: this.f.firstName.value,
            lastName: this.f.lastName.value,
            username: this.f.email.value,
            email: this.f.email.value,
            password: this.f.password.value,
            roles: [this.f.role.value],
            countryId: this.f.country.value,
        };

        this.store.dispatch(createUser({ payload }));
    }
}
