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

@Component({
  selector: 'app-treatment-info',
  templateUrl: './treatment-info.component.html',
  styleUrls: ['./treatment-info.component.scss'],
})
export class TreatmentInfoComponent implements OnInit, AfterContentChecked {
  corpseDestruction: boolean;
  wasObservation: boolean;
  wasQuarantined: boolean;
  movementControlled: boolean;
  administeredMeds: boolean;

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
        Validators.required,
      ],
      corpsesDestroyed: [this.formData.corpsesDestroyed],
      disinfection: [this.formData.disinfection, Validators.required],
      observation: [this.formData.observation, Validators.required],
      observationDuration: [this.formData.observationDuration],
      quarantine: [this.formData.quarantine, Validators.required],
      quarantineDuration: [this.formData.quarantineDuration],
      movementControl: [this.formData.movementControl, Validators.required],
      movementControlMeasures: [this.formData.movementControlMeasures],
      treatment: [this.formData.treatment, Validators.required],
      medications: [this.formData.medications],
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
          this.treatmentInfo.get('corpsesDestroyed')?.clearValidators();
        }

        this.corpseDestruction = value;
      });

    this.treatmentInfo.get('observation')?.valueChanges.subscribe((value) => {
      if (value) {
        this.treatmentInfo
          .get('observationDuration')
          ?.setValidators([Validators.required]);
      } else {
        this.treatmentInfo.get('observationDuration')?.clearValidators();
      }

      this.wasObservation = value;
    });

    this.treatmentInfo.get('quarantine')?.valueChanges.subscribe((value) => {
      if (value) {
        this.treatmentInfo
          .get('quarantineDuration')
          ?.setValidators([Validators.required]);
      } else {
        this.treatmentInfo.get('quarantineDuration')?.clearValidators();
      }

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
          this.treatmentInfo.get('movementControlMeasures')?.clearValidators();
        }

        this.movementControlled = value;
      });

    this.treatmentInfo.get('treatment')?.valueChanges.subscribe((value) => {
      if (value) {
        this.treatmentInfo
          .get('medications')
          ?.setValidators([Validators.required]);
      } else {
        this.treatmentInfo.get('medications')?.clearValidators();
      }

      this.administeredMeds = value;
    });
  }

  onPrevious() {
    this.previous.emit();
  }

  onSubmit() {
    this.submit.emit(this.treatmentInfo.value);
  }
}
