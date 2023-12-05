import {
    AfterContentChecked,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';

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

    displayedColumns: string[] = ['name', 'dosage', 'actions'];

    durations: string[] = ['hours', 'days', 'weeks', 'months'];
    controlMeasures: string[] =
    [
        'Sanitary slaughter',
        'Official destruction of carcasses, by-products and waste',
        'Disinfection',
        'Process for inactivating the pathogen in products or by-products',
        'Movement restrictions',
        'Surveillance inside the restriction zone',
        'Surveillance outside the restriction zone',
        'Official destruction of animal products',
        'Official vaccination',
        'Pre and post-mortem inspection',
        'Selective slaughter and disposal',
        'Border control',
        'Zoning',
        'Compartmentalization',
    ];

    @Input() formData: any;

    @Output() previous = new EventEmitter();
    @Output() submit = new EventEmitter();

    treatmentInfo: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.corpseDestruction = this.formData.destructionOfCorpses;
        this.wasObservation = this.formData.observation;
        this.wasQuarantined = this.formData.quarantine;
        this.movementControlled = this.formData.movementControl;
        this.administeredMeds = this.formData.treatment;

        this.initForm();

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
              //  Validators.required,
            ],
            corpsesDestroyed: [this.formData.corpsesDestroyed],
            disinfection: [this.formData.disinfection, Validators.required],
            observation: [
                this.formData.observation,
             //   Validators.required
            ],
            observationDuration: [this.formData.observationDuration],
            observationDurationSuffix: [
                this.formData.observationDurationSuffix,
            ],
            quarantine: [this.formData.quarantine, Validators.required],
            quarantineDuration: [this.formData.quarantineDuration],
            quarantineDurationSuffix: [this.formData.quarantineDurationSuffix],
            movementControl: [
                this.formData.movementControl,
              //  Validators.required,
            ],
            movementControlMeasures: [this.formData.movementControlMeasures],
            treatment: [
                this.formData.treatment,
                Validators.required
            ],
            treatmentDetails: [this.formData.treatmentDetails],
            medications: [
                this.formData.medications?.length
                    ? this.formData.medications
                    : [],
            ],
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
                    this.treatmentInfo.controls.observationDurationSuffix?.clearValidators();
                }

                this.treatmentInfo.controls.observationDuration?.updateValueAndValidity();
                this.treatmentInfo.controls.observationDurationSuffix?.updateValueAndValidity();
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
                    this.treatmentInfo.controls.quarantineDurationSuffix?.clearValidators();
                }
                this.treatmentInfo.controls.quarantineDuration?.updateValueAndValidity();
                this.treatmentInfo.controls.quarantineDurationSuffix?.updateValueAndValidity();
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
        if (this.f.observationDuration.value != '')
            this.treatmentInfo.patchValue(
                {
                    observationDuration: `${this.f.observationDuration.value} ${this.f.observationDurationSuffix.value}`,
                },
                { emitEvent: true }
            );

        if (this.f.quarantineDuration.value != '')
            this.treatmentInfo.patchValue(
                {
                    quarantineDuration: `${this.f.quarantineDuration.value} ${this.f.quarantineDurationSuffix.value}`,
                },
                { emitEvent: true }
            );
        this.submit.emit(this.treatmentInfo.value);
    }

    updateControlMeasure(event: any) {
        this.controlMeasure = event.option.value;
        const controlMeasure: string = event.option.value;
        console.log({controlMeasure})
        if(controlMeasure === this.controlMeasures[1]){
            this.corpseDestruction = true;
            this.treatmentInfo.get('destructionOfCorpses').setValue(true);
        }

        if(controlMeasure === this.controlMeasures[2]){
            this.treatmentInfo.get('disinfection').setValue(true);
        }

        if(controlMeasure === this.controlMeasures[4] || controlMeasure === this.controlMeasures[11]){
            this.movementControlled = true;
            this.treatmentInfo.get('movementControl').setValue(true);
        }

        if(controlMeasure === this.controlMeasures[5] || controlMeasure === this.controlMeasures[6] ){
            this.wasObservation = true;
            this.treatmentInfo.get('observation').setValue(true);
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
