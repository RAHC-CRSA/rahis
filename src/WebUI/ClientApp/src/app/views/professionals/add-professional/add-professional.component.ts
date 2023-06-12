import { Component } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { ParaProfessionalsState } from 'app/modules/professionals/store';
import {
    addParaProfessional,
    loadInstitutions,
} from 'app/modules/professionals/store/actions';
import {
    getFeedback,
    getInstitutions,
    getParaProfessionalsLoading,
} from 'app/modules/professionals/store/selectors';
import {
    IAddParaProfessionalCommand,
    InstitutionDto,
    ServerResponse,
} from 'app/web-api-client';
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-add-professional',
    templateUrl: './add-professional.component.html',
    styleUrls: ['./add-professional.component.scss'],
    animations: fuseAnimations,
})
export class AddProfessionalComponent {
    professionalForm: FormGroup;
    loading$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    institutionControl = new FormControl();

    selectedInstitution: InstitutionDto;

    institutions$: Observable<InstitutionDto[] | null | undefined>;
    institutions: InstitutionDto[];
    filteredInstitutions: Observable<InstitutionDto[]>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<ParaProfessionalsState>
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.initData();
    }

    initForm() {
        this.professionalForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            position: ['', [Validators.required]],
            email: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            institution: ['', [Validators.required]],
        });
    }

    initData() {
        this.store.dispatch(loadInstitutions());
        this.institutions$ = this.store.select(getInstitutions);
        this.institutions$.subscribe((institutions) => {
            this.institutions = institutions;

            this.filteredInstitutions =
                this.institutionControl.valueChanges.pipe(
                    startWith({} as InstitutionDto),
                    map((institution) =>
                        institution && typeof institution === 'object'
                            ? institution.name
                            : institution
                    ),
                    map((name: string) =>
                        name
                            ? this._filterInstitution(name)
                            : this.institutions.slice()
                    )
                );
        });

        this.loading$ = this.store.select(getParaProfessionalsLoading);
        this.feedback$ = this.store.select(getFeedback);
    }

    get f() {
        return this.professionalForm?.controls;
    }

    private _filterInstitution(name: string): InstitutionDto[] {
        return this.institutions.filter(
            (option) =>
                option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
        );
    }

    displayInstitutionFn(institution: InstitutionDto): string {
        return institution ? institution.name : '';
    }

    updateSelectedInstitution(event: any) {
        this.selectedInstitution = event.option.value;
        const institution: InstitutionDto = event.option.value;

        this.professionalForm.patchValue({ institution: institution.id });
    }

    submit() {
        const payload: IAddParaProfessionalCommand = {
            name: this.f.name.value,
            position: this.f.position.value,
            email: this.f.email.value,
            phone: this.f.phone.value,
            institutionId: this.f.institution.value,
        };

        this.store.dispatch(addParaProfessional({ payload }));
    }
}
