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
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { ReportState } from 'app/modules/reports/store';
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
import { fileURLToPath } from 'url';

@Component({
    selector: 'app-diagnostic-tests',
    templateUrl: './diagnostic-tests.component.html',
    styleUrls: ['./diagnostic-tests.component.scss'],
    animations: fuseAnimations,
})
export class DiagnosticTestsComponent implements OnInit, AfterContentChecked {
    @Input() formData: any;

    otherOption: string = 'Other';
    newProfessional: boolean = false;

    selectedFile: File | null = null;
    base64String: string | null = null;

    professionalControl = new FormControl();
    selectedProfessional: ParaProfessionalDto;

    professionals$: Observable<ParaProfessionalDto[] | null | undefined>;
    professionals: ParaProfessionalDto[];
    filteredProfessionals: Observable<ParaProfessionalDto[]>;

    @Output() previous = new EventEmitter();
    @Output() submit = new EventEmitter();

    hasTests: boolean;
    displayedColumns: string[] = [
        'name',
        'numberTested',
        'numberPositive',
        // 'numberNegative',
        // 'numberUndetermined',
        'actions',
    ];

    testsInfo: FormGroup;
    testForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<ReportState>,
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
            tested: [this.formData.diagnosticTests?.length],
            tests: [
                this.formData.diagnosticTests?.length
                    ? this.formData.tests
                    : [],
            ],
        });

        this.testForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            testResultImage: [''],
            numberTested: ['', [Validators.required]],
            numberPositive: ['', [Validators.required]],
            professionalId: ['', [Validators.required]],
        });
    }

    initData() {
        this.store.dispatch(
            loadParaProfessionals({
                payload: {
                    countryId: this.formData.country,
                    institutionId: undefined,
                },
            })
        );
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

    onCheckProfessional(isNew: boolean) {
        this.newProfessional = isNew;

        if (!this.newProfessional) {
            this.professionalControl.enable();
        }
    }

    onAddProfessionalClosed() {
        this.onCheckProfessional(false);
        this.professionalControl.setValue('', { emitEvent: true });
        this.testForm.patchValue({ professionalId: '' }, { emitEvent: true });
    }

    onFileSelected(event: any) {
        const files: FileList | null = event.target.files;

        if (files && files.length > 0) {
            console.log({ files: files.length });
            const selectedFile: File = files[0];
            if (this.isImageFile(selectedFile)) {
                if (selectedFile.size > 2097152) {
                    // Set validation error
                    this.testForm.controls['testResultImage'].setErrors({
                        fileSizeExceeded: true,
                    });
                } else {
                    this.selectedFile = selectedFile;
                    this.convertToBase64(this.selectedFile);
                }
            }
        }
    }

    isImageFile(file: File) {
        console.log({ fileType: file.type });
        return file.type.startsWith('image/');
    }

    convertToBase64(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            console.log({ reader });
            const fileType = file.type;
            const imageString = reader.result as string;
            this.base64String = imageString.replace(
                `data:${fileType};base64,`,
                ''
            );
        };

        reader.onerror = (error) => {
            console.error('Error converting file to base64:', error);
        };
    }

    onTestSubmitted() {
        if (this.selectedFile != null) {
            this.convertToBase64(this.selectedFile);
            this.testForm.patchValue(
                { testResultImage: this.base64String },
                { emitEvent: true }
            );
        }

        this.formData.diagnosticTests = [
            ...this.formData.diagnosticTests,
            this.testForm.value,
        ];
        this.testsInfo.patchValue(
            {
                tests: this.formData.diagnosticTests,
            },
            { emitEvent: true }
        );

        this.testForm.reset();
        this.selectedFile = null;
        this.base64String = null;

        this.testsInfo.controls.tests?.clearValidators();
        this.testsInfo.controls.tests?.updateValueAndValidity();
    }

    onDeleteTest(idx: number) {
        this.formData.diagnosticTests = this.formData.diagnosticTests.filter(
            (e, i) => {
                if (i != idx) return e;
            }
        );

        this.testsInfo.patchValue(
            {
                tests: this.formData.diagnosticTests,
            },
            { emitEvent: true }
        );
    }

    onPrevious() {
        this.previous.emit();
    }

    onSubmit() {
        this.submit.emit(this.testsInfo.value);
    }
}
