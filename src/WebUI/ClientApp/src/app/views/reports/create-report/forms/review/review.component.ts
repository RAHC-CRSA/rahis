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
import { loadControlMeasures } from 'app/modules/reports/store/actions';
import {
    getControlMeasures,
    getReportsLoading,
} from 'app/modules/reports/store/selectors';
import { ControlMeasureDto, DiagnosticTestDto } from 'app/web-api-client';
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss'],
    animations: fuseAnimations,
})
export class ReviewComponent implements OnInit, AfterContentChecked {
    @Input() formData: any;

    @Output() submit = new EventEmitter();

    corpseDestruction: boolean;
    wasObservation: boolean;
    wasQuarantined: boolean;
    movementControlled: boolean;
    administeredMeds: boolean;

    hideRequiredMarker: boolean = true;
    requiredLabel: string = '*required';

    controlMeasuresControl = new FormControl();
    selectedControlMeasure: ControlMeasureDto;
    loaded$: Observable<boolean>;

    controlMeasures$: Observable<ControlMeasureDto[] | null | undefined>;
    controlMeasures: ControlMeasureDto[];
    filteredControlMeasures: Observable<ControlMeasureDto[]>;

    loading$: Observable<boolean>;

    reviewForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<ReportState>,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.corpseDestruction = this.formData.destructionOfCorpses;
        this.wasObservation = this.formData.observation;
        this.wasQuarantined = this.formData.quarantine;
        this.movementControlled = this.formData.movementControl;
        this.administeredMeds = this.formData.treatment;

        this.initData();
        this.initForm();

        this.initConditionalValidation();
    }

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    initData() {
        this.store.dispatch(loadControlMeasures());
        this.controlMeasures$ = this.store.select(getControlMeasures);
        this.loading$ = this.store.select(getReportsLoading);

        this.controlMeasures$.subscribe((controlMeasures) => {
            this.controlMeasures = controlMeasures;

            this.filteredControlMeasures =
                this.controlMeasuresControl.valueChanges.pipe(
                    startWith({} as ControlMeasureDto),
                    map((controlMeasure) =>
                        controlMeasure && typeof controlMeasure === 'object'
                            ? controlMeasure.name
                            : controlMeasure
                    ),
                    map((name: string) =>
                        name
                            ? this._filterControlMeasures(name)
                            : this.controlMeasures.slice()
                    )
                );

            if (this.formData.controlMeasuresCode) {
                const controlMeasure = this.controlMeasures.find(
                    (m) => m.code == this.formData.controlMeasuresCode
                );

                if (controlMeasure != null) {
                    this.selectedControlMeasure = controlMeasure;
                    this.controlMeasuresControl.setValue(controlMeasure, {
                        emitEvent: true,
                    });

                    this.reviewForm?.patchValue({
                        controlMeasuresCode: controlMeasure.code,
                    });

                    this.updateControlMeasure(controlMeasure);
                }
            }
        });
    }

    initForm() {
        this.reviewForm = this.formBuilder.group({
            reportType: [this.formData.reportType, [Validators.required]],
            country: [this.formData.country, [Validators.required]],
            region: [this.formData.region, [Validators.required]],
            municipality: [this.formData.municipality],
            district: [this.formData.district],
            community: [this.formData.community],
            disease: [this.formData.disease, Validators.required],
            species: [this.formData.species, Validators.required],
            newOccurrence: [this.formData.newOccurrence],
            occurrence: [this.formData.occurrence],
            exposed: [this.formData.exposed, Validators.required],
            infected: [this.formData.infected, Validators.required],
            dead: [this.formData.dead, Validators.required],
            humanInfection: [
                this.formData.humanInfection,
                Validators.compose([Validators.required]),
            ],
            humansExposed: [this.formData.humansExposed],
            humansInfected: [this.formData.humansInfected],
            stampingOut: [this.formData.stampingOut, Validators.required],
            destructionOfCorpses: [
                this.formData.destructionOfCorpses,
                Validators.required,
            ],
            corpsesDestroyed: [this.formData.corpsesDestroyed],
            disinfection: [this.formData.disinfection, Validators.required],
            observation: [this.formData.observation, Validators.required],
            observationDuration: [this.formData.observationDuration],
            quarantine: [this.formData.quarantine, Validators.required],
            quarantineDuration: [this.formData.quarantineDuration],
            movementControl: [
                this.formData.movementControl,
                Validators.required,
            ],
            movementControlMeasures: [this.formData.movementControlMeasures],
            treatment: [this.formData.treatment, Validators.required],
            treatmentDetails: [this.formData.treatmentDetails],
            controlMeasuresCode: [
                this.formData.controlMeasuresCode,
                [Validators.required],
            ],
            tests: [
                this.formData.diagnosticTests?.length
                    ? this.formData.tests
                    : [],
            ],
            medications: [
                this.formData.medications?.length
                    ? this.formData.medications
                    : [],
            ],
            vaccinations: [
                this.formData.vaccinations?.length
                    ? this.formData.vaccinations
                    : [],
            ],
        });

        if (this.formData.destructionOfCorpses) {
            this.reviewForm
                .get('corpsesDestroyed')
                ?.setValidators([Validators.required]);
        }

        if (this.formData.observation) {
            this.reviewForm
                .get('observationDuration')
                ?.setValidators([Validators.required]);
        }

        if (this.formData.quarantine) {
            this.reviewForm
                .get('quarantineDuration')
                ?.setValidators([Validators.required]);
        }

        if (this.formData.movementControl) {
            this.reviewForm
                .get('movementControlMeasures')
                ?.setValidators([Validators.required]);
        }

        if (this.formData.treatment) {
            this.reviewForm
                .get('medications')
                ?.setValidators([Validators.required]);
        }
    }

    initConditionalValidation() {
        this.reviewForm
            .get('destructionOfCorpses')
            ?.valueChanges.subscribe((value) => {
                if (value) {
                    this.reviewForm
                        .get('corpsesDestroyed')
                        ?.setValidators([Validators.required]);
                } else {
                    this.reviewForm.controls.corpsesDestroyed?.clearValidators();
                }

                this.reviewForm.controls.corpsesDestroyed?.updateValueAndValidity();
                this.corpseDestruction = value;
            });

        this.reviewForm.get('observation')?.valueChanges.subscribe((value) => {
            if (value) {
                this.reviewForm
                    .get('observationDuration')
                    ?.setValidators([Validators.required]);
            } else {
                this.reviewForm.controls.observationDuration?.clearValidators();
            }

            this.reviewForm.controls.observationDuration?.updateValueAndValidity();
            this.wasObservation = value;
        });

        this.reviewForm.get('quarantine')?.valueChanges.subscribe((value) => {
            if (value) {
                this.reviewForm
                    .get('quarantineDuration')
                    ?.setValidators([Validators.required]);
            } else {
                this.reviewForm.controls.quarantineDuration?.clearValidators();
            }
            this.reviewForm.controls.quarantineDuration?.updateValueAndValidity();
            this.wasQuarantined = value;
        });

        this.reviewForm
            .get('movementControl')
            ?.valueChanges.subscribe((value) => {
                if (value) {
                    this.reviewForm
                        .get('movementControlMeasures')
                        ?.setValidators([Validators.required]);
                } else {
                    this.reviewForm.controls.movementControlMeasures?.clearValidators();
                }

                this.reviewForm.controls.movementControlMeasures?.updateValueAndValidity();
                this.movementControlled = value;
            });

        this.reviewForm.get('treatment')?.valueChanges.subscribe((value) => {
            if (value) {
                this.reviewForm
                    .get('medications')
                    ?.setValidators([Validators.required]);
                // this.reviewForm
                //     .get('treatmentDetails')
                //     ?.setValidators([Validators.required]);
            } else {
                this.reviewForm.controls.medications?.clearValidators();
                this.reviewForm.controls.treatmentDetails?.clearValidators();
            }

            this.reviewForm.controls.medications?.updateValueAndValidity();
            this.reviewForm.controls.treatmentDetails?.updateValueAndValidity();
            this.administeredMeds = value;
        });

        this.reviewForm
            .get('controlMeasuresCode')
            ?.valueChanges.subscribe((value) => {
                if (value)
                    this.updateControlMeasure(this.selectedControlMeasure);
            });
    }

    get f() {
        return this.reviewForm.controls;
    }

    private _filterControlMeasures(name: string): ControlMeasureDto[] {
        return this.controlMeasures.filter(
            (option) =>
                option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
        );
    }

    displayControlMeasureFn(controlMeasure: ControlMeasureDto): string {
        return controlMeasure
            ? `${controlMeasure.code} | ${controlMeasure.name}`
            : '';
    }

    updateSelectedControlMeasure(event: any) {
        this.selectedControlMeasure = event.option.value;
        this.updateControlMeasure(this.selectedControlMeasure);

        this.reviewForm.patchValue(
            {
                controlMeasuresCode: this.selectedControlMeasure.code,
            },
            { emitEvent: true }
        );
    }

    updateControlMeasure(controlMeasure: ControlMeasureDto) {
        if (controlMeasure == null) return;

        if (controlMeasure.code === 'CM002') {
            this.reviewForm.patchValue(
                { destructionOfCorpses: true },
                { emitEvent: true }
            );
        } else {
            this.reviewForm.patchValue(
                { destructionOfCorpses: false },
                { emitEvent: true }
            );
        }

        if (controlMeasure.code === 'CM003') {
            this.reviewForm.patchValue(
                { disinfection: true },
                { emitEvent: true }
            );
        } else {
            this.reviewForm.patchValue(
                { disinfection: false },
                { emitEvent: true }
            );
        }

        if (
            controlMeasure.code === 'CM005' ||
            controlMeasure.code === 'CM012'
        ) {
            this.reviewForm.patchValue(
                { movementControl: true },
                { emitEvent: true }
            );
        } else {
            this.reviewForm.patchValue(
                { movementControl: false },
                { emitEvent: true }
            );
        }

        if (
            controlMeasure.code === 'CM006' ||
            controlMeasure.code === 'CM007'
        ) {
            this.reviewForm.patchValue(
                { observation: true },
                { emitEvent: true }
            );
        } else {
            this.reviewForm.patchValue(
                { observation: false },
                { emitEvent: true }
            );
        }
    }

    onTestSubmitted(diagnosticTest: DiagnosticTestDto) {
        console.log({ diagnosticTest });
    }

    onSubmit() {
        this.submit.emit(this.reviewForm.value);
    }
}
