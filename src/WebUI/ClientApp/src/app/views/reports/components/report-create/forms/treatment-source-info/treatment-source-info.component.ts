import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-treatment-source-info',
  templateUrl: './treatment-source-info.component.html',
  styleUrls: ['./treatment-source-info.component.scss'],
})
export class TreatmentSourceInfoComponent implements OnInit {
  vaccinated: boolean;
  tested: boolean;

  @Input() formData: any;

  @Output() previous = new EventEmitter();
  @Output() submit = new EventEmitter();

  treatmentSourceInfo: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.vaccinated = this.formData.vaccination;
    this.tested = this.formData.diagnosticTest;

    this.initForm();
  }

  initForm() {
    this.treatmentSourceInfo = this.formBuilder.group({
      hasVaccinations: [this.formData.vaccinations?.length ? true : false],
      vaccinations: [this.formData.vaccinations],
      hasTests: [this.formData.tests?.length ? true : false],
      tests: [this.formData.tests],
      treatmentDetails: [this.formData.treatmentDetails],
    });
  }

  initConditionalValidation() {
    this.treatmentSourceInfo
      .get('hasVaccinations')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.treatmentSourceInfo
            .get('vaccinations')
            ?.setValidators([Validators.required]);
        } else {
          this.treatmentSourceInfo.get('vaccinations')?.clearValidators();
        }

        this.vaccinated = value;
      });

    this.treatmentSourceInfo
      .get('hasTests')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.treatmentSourceInfo
            .get('tests')
            ?.setValidators([Validators.required]);
        } else {
          this.treatmentSourceInfo.get('tests')?.clearValidators();
        }

        this.tested = value;
      });
  }

  onPrevious() {
    this.previous.emit();
  }

  onSubmit() {
    this.submit.emit(this.treatmentSourceInfo.value);
  }
}
