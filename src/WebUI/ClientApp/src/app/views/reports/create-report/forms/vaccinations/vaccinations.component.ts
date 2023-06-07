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
import { ReportsState } from 'app/modules/reports/store';
import {
    addParaProfessional,
    loadParaProfessionals,
} from 'app/modules/reports/store/actions';
import { getParaProfessionals } from 'app/modules/reports/store/selectors';
import {
    IAddParaProfessionalCommand,
    ParaProfessionalDto,
} from 'app/web-api-client';
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-vaccinations',
    templateUrl: './vaccinations.component.html',
    styleUrls: ['./vaccinations.component.scss'],
})
export class VaccinationsComponent implements OnInit, AfterContentChecked {
    @Input() formData: any;

    otherOption: string = 'Other (add a new professional)';
    newProfessional: boolean = false;

    professionalControl = new FormControl();
    selectedProfessional: ParaProfessionalDto;

    professionals$: Observable<ParaProfessionalDto[] | null | undefined>;
    professionals: ParaProfessionalDto[];
    filteredProfessionals: Observable<ParaProfessionalDto[]>;

    @Output() previous = new EventEmitter();
    @Output() submit = new EventEmitter();

    hasVaccinations: boolean;
    displayedColumns: string[] = ['name', 'numberVaccinated'];

    vaccinationsInfo: FormGroup;
    vaccinationForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<ReportsState>,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.hasVaccinations = this.formData.vaccinations?.length
            ? true
            : false;

        this.initForm();
        this.initData();
        this.initConditionalValidation();
    }

    initForm() {
        this.vaccinationsInfo = this.formBuilder.group({
            vaccinated: [this.hasVaccinations],
            vaccinations: [
                this.formData.vaccinations?.length
                    ? this.formData.vaccinations
                    : [],
            ],
        });

        this.vaccinationForm = this.formBuilder.group({
            name: ['', Validators.required],
            numberVaccinated: ['', Validators.required],
            professionalId: ['', Validators.required],
        });
    }

    initData() {
        this.store.dispatch(loadParaProfessionals({ payload: undefined }));
        this.professionals$ = this.store.select(getParaProfessionals);
        this.professionals$.subscribe((professionals) => {
            this.professionals = professionals;

            this.filteredProfessionals =
                this.professionalControl.valueChanges.pipe(
                    startWith({} as ParaProfessionalDto),
                    map((professional) =>
                        professional && typeof professional === 'object'
                            ? professional.name
                            : professional
                    ),
                    map((name: string) =>
                        name
                            ? this._filterProfessional(name)
                            : this.professionals.slice()
                    )
                );
        });
    }

    get f() {
        return this.vaccinationsInfo.controls;
    }

    private _filterProfessional(name: string): ParaProfessionalDto[] {
        return this.professionals.filter(
            (option) =>
                option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
        );
    }

    displayProfessionalFn(professional: ParaProfessionalDto): string {
        return professional ? professional.name : '';
    }

    updateSelectedProfessional(event: any) {
        this.selectedProfessional = event.option.value;
        const professional: ParaProfessionalDto = event.option.value;

        this.newProfessional =
            professional.name.toLowerCase() === this.otherOption.toLowerCase();

        this.vaccinationForm.patchValue({ professionalId: professional.id });

        if (this.newProfessional) this.professionalControl.disable();
    }

    onSubmitProfessional(professional: IAddParaProfessionalCommand) {
        this.store.dispatch(addParaProfessional({ payload: professional }));

        this.professionalControl.enable();
    }

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    initConditionalValidation() {
        this.vaccinationsInfo
            .get('vaccinated')
            ?.valueChanges.subscribe((value) => {
                if (value) {
                    this.vaccinationsInfo
                        .get('vaccinations')
                        ?.setValidators([Validators.required]);
                } else {
                    this.vaccinationsInfo.controls.vaccinations?.clearValidators();
                }

                this.vaccinationsInfo.controls.vaccinations?.updateValueAndValidity();
                this.hasVaccinations = value;
            });
    }

    onVaccinationSubmitted() {
        this.formData.vaccinations = [
            ...this.formData.vaccinations,
            this.vaccinationForm.value,
        ];
        this.vaccinationsInfo.patchValue({
            vaccinations: this.formData.vaccinations,
        });

        this.vaccinationForm.reset();
        this.professionalControl.reset();
        this.vaccinationsInfo.controls.vaccinations?.updateValueAndValidity();
    }

    onPrevious() {
        this.previous.emit();
    }

    onSubmit() {
        this.submit.emit(this.vaccinationsInfo.value);
    }
}
