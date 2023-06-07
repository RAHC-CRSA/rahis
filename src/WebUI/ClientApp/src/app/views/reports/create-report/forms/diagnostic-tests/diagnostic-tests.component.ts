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
    selector: 'app-diagnostic-tests',
    templateUrl: './diagnostic-tests.component.html',
    styleUrls: ['./diagnostic-tests.component.scss'],
})
export class DiagnosticTestsComponent implements OnInit, AfterContentChecked {
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

    hasTests: boolean;
    displayedColumns: string[] = ['name', 'numberTested'];

    testsInfo: FormGroup;
    testForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<ReportsState>,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.hasTests = this.formData.diagnosticTests?.length ? true : false;

        this.initForm();
        this.initData();
        this.initConditionalValidation();
    }

    initForm() {
        this.testsInfo = this.formBuilder.group({
            tested: [this.hasTests],
            tests: [this.formData.tests?.length ? this.formData.tests : null],
        });

        this.testForm = this.formBuilder.group({
            name: ['', Validators.required],
            numberTested: ['', Validators.required],
            professionalId: ['', Validators.required],
        });
    }

    initData() {
        this.store.dispatch(loadParaProfessionals({ payload: undefined }));
        this.professionals$ = this.store.select(getParaProfessionals);
        this.professionals$.subscribe((professionals) => {
            this.professionals = [
                ...professionals,
                new ParaProfessionalDto({ id: null, name: this.otherOption }),
            ];

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
        return this.testsInfo.controls;
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

        this.testForm.patchValue({ professionalId: professional.id });

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
        this.testsInfo.get('tested')?.valueChanges.subscribe((value) => {
            if (value) {
                this.testsInfo
                    .get('tests')
                    ?.setValidators([Validators.required]);
            } else {
                this.testsInfo.controls.tests?.clearValidators();
            }

            this.testsInfo.controls.tests?.updateValueAndValidity();
            this.hasTests = value;
        });
    }

    onTestSubmitted(test: any) {
        this.formData.diagnosticTests = [
            ...this.formData.diagnosticTests,
            test,
        ];
        this.testsInfo.patchValue({
            diagnosticTests: this.formData.diagnosticTests,
        });
        this.testsInfo.controls.tests?.updateValueAndValidity();
    }

    onPrevious() {
        this.previous.emit();
    }

    onSubmit() {
        this.submit.emit(this.testsInfo.value);
    }
}
