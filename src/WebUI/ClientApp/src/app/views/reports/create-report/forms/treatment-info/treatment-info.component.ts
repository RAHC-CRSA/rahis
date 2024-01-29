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
    getReportsLoaded,
} from 'app/modules/reports/store/selectors';
import { ControlMeasureDto } from 'app/web-api-client';
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-treatment-info',
    templateUrl: './treatment-info.component.html',
    styleUrls: ['./treatment-info.component.scss'],
    animations: fuseAnimations,
})
export class TreatmentInfoComponent implements OnInit, AfterContentChecked {
    corpseDestruction: boolean;
    wasObservation: boolean;
    wasQuarantined: boolean;
    movementControlled: boolean;
    administeredMeds: boolean;
    controlMeasure: string;

    controlMeasuresControl = new FormControl();
    selectedControlMeasure: ControlMeasureDto;
    loaded$: Observable<boolean>;

    controlMeasures$: Observable<ControlMeasureDto[] | null | undefined>;
    controlMeasures: ControlMeasureDto[];
    filteredControlMeasures: Observable<ControlMeasureDto[]>;

    displayedColumns: string[] = ['name', 'dosage', 'actions'];

    durations: string[] = ['hours', 'days', 'weeks', 'months'];

    @Input() formData: any;

    @Output() previous = new EventEmitter();
    @Output() submit = new EventEmitter();

    treatmentInfo: FormGroup;

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

        this.initForm();
        this.initData();

        this.initConditionalValidation();
    }

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    initForm() {
        this.treatmentInfo = this.formBuilder.group({
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
            controlMeasuresCode: [this.formData.controlMeasuresCode],
            treatment: [this.formData.treatment, Validators.required],
            treatmentDetails: [this.formData.treatmentDetails],
            medications: [
                this.formData.medications?.length
                    ? this.formData.medications
                    : [],
            ],
        });
    }

    initData() {
        this.store.dispatch(loadControlMeasures());
        this.controlMeasures$ = this.store.select(getControlMeasures);
        this.loaded$ = this.store.select(getReportsLoaded);

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

            if (this.formData.controlMeasuresCode && this.controlMeasures) {
                const controlMeasure = this.controlMeasures.find(
                    (m) => m.code == this.formData.controlMeasuresCode
                );

                this.selectedControlMeasure = controlMeasure;
                this.controlMeasuresControl.setValue(controlMeasure, {
                    emitEvent: true,
                });

                this.treatmentInfo.patchValue({
                    controlMeasuresCode: controlMeasure?.code,
                });

                this.updateControlMeasure(controlMeasure);
            }
        });
    }

    initConditionalValidation() {
        this.treatmentInfo
            .get('destructionOfCorpses')
            ?.valueChanges.subscribe((value) => {
                if (value) {
                    this.treatmentInfo
                        .get('corpsesDestroyed')
                        ?.setValidators([Validators.required]);
                } else {
                    this.treatmentInfo.controls.corpsesDestroyed?.clearValidators();
                }

                this.treatmentInfo.controls.corpsesDestroyed?.updateValueAndValidity();
                this.corpseDestruction = value;
            });

        this.treatmentInfo
            .get('observation')
            ?.valueChanges.subscribe((value) => {
                if (value) {
                    this.treatmentInfo
                        .get('observationDuration')
                        ?.setValidators([Validators.required]);
                    this.treatmentInfo
                        .get('observationDurationSuffix')
                        ?.setValidators([Validators.required]);
                } else {
                    this.treatmentInfo.controls.observationDuration?.clearValidators();
                }

                this.treatmentInfo.controls.observationDuration?.updateValueAndValidity();
                this.wasObservation = value;
            });

        this.treatmentInfo
            .get('quarantine')
            ?.valueChanges.subscribe((value) => {
                if (value) {
                    this.treatmentInfo
                        .get('quarantineDuration')
                        ?.setValidators([Validators.required]);
                    this.treatmentInfo
                        .get('quarantineDurationSuffix')
                        ?.setValidators([Validators.required]);
                } else {
                    this.treatmentInfo.controls.quarantineDuration?.clearValidators();
                }
                this.treatmentInfo.controls.quarantineDuration?.updateValueAndValidity();
                this.wasQuarantined = value;
            });

        this.treatmentInfo
            .get('movementControl')
            ?.valueChanges.subscribe((value) => {
                if (value) {
                    this.treatmentInfo
                        .get('movementControlMeasures')
                        ?.setValidators([Validators.required]);
                } else {
                    this.treatmentInfo.controls.movementControlMeasures?.clearValidators();
                }

                this.treatmentInfo.controls.movementControlMeasures?.updateValueAndValidity();
                this.movementControlled = value;
            });

        this.treatmentInfo.get('treatment')?.valueChanges.subscribe((value) => {
            if (value) {
                this.treatmentInfo
                    .get('medications')
                    ?.setValidators([Validators.required]);
                // this.treatmentInfo
                //     .get('treatmentDetails')
                //     ?.setValidators([Validators.required]);
            } else {
                this.treatmentInfo.controls.medications?.clearValidators();
                this.treatmentInfo.controls.treatmentDetails?.clearValidators();
            }

            this.treatmentInfo.controls.medications?.updateValueAndValidity();
            this.treatmentInfo.controls.treatmentDetails?.updateValueAndValidity();
            this.administeredMeds = value;
        });

        this.treatmentInfo
            .get('controlMeasuresCode')
            ?.valueChanges.subscribe((value) => {
                this.updateControlMeasure(this.selectedControlMeasure);
            });
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

        this.treatmentInfo.patchValue(
            {
                controlMeasuresCode: this.selectedControlMeasure.code,
            },
            { emitEvent: true }
        );
    }

    get f() {
        return this.treatmentInfo.controls;
    }

    onMedicationSubmit(medication: any) {
        this.formData.medications = [...this.formData.medications, medication];
        this.treatmentInfo.patchValue(
            {
                medications: this.formData.medications,
            },
            { emitEvent: true }
        );
        this.treatmentInfo.controls.medications?.updateValueAndValidity();
    }

    onDeleteMedication(idx: number) {
        this.formData.medications = this.formData.medications.filter((e, i) => {
            if (i != idx) return e;
        });

        this.treatmentInfo.patchValue({
            medications: this.formData.medications,
        });
    }

    onPrevious() {
        this.previous.emit();
    }

    onSubmit() {
        this.submit.emit(this.treatmentInfo.value);
    }

    updateControlMeasure(controlMeasure: ControlMeasureDto) {
        if (controlMeasure == null) return;

        if (controlMeasure.code === 'CM002') {
            this.treatmentInfo.patchValue(
                { destructionOfCorpses: true },
                { emitEvent: true }
            );
        } else {
            this.treatmentInfo.patchValue(
                { destructionOfCorpses: false },
                { emitEvent: true }
            );
        }

        if (controlMeasure.code === 'CM003') {
            this.treatmentInfo.patchValue(
                { disinfection: true },
                { emitEvent: true }
            );
        } else {
            this.treatmentInfo.patchValue(
                { disinfection: false },
                { emitEvent: true }
            );
        }

        if (
            controlMeasure.code === 'CM005' ||
            controlMeasure.code === 'CM012'
        ) {
            this.treatmentInfo.patchValue(
                { movementControl: true },
                { emitEvent: true }
            );
        } else {
            this.treatmentInfo.patchValue(
                { movementControl: false },
                { emitEvent: true }
            );
        }

        if (
            controlMeasure.code === 'CM006' ||
            controlMeasure.code === 'CM007'
        ) {
            this.treatmentInfo.patchValue(
                { observation: true },
                { emitEvent: true }
            );
        } else {
            this.treatmentInfo.patchValue(
                { observation: false },
                { emitEvent: true }
            );
        }

        // if(controlMeasure == this.controlMeasures[5] || controlMeasure == this.controlMeasures[6] ){
        //     this.wasQuarantined = true;
        // }

        // this.wasObservation = this.formData.observation;
        // this.wasQuarantined = this.formData.quarantine;
        // this.movementControlled = this.formData.movementControl;
        // this.administeredMeds = this.formData.treatment;
    }
}
