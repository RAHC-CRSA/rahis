import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterContentChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IAddDiagnosticTestCommand,
  IAddVaccinationCommand,
} from 'src/app/web-api-client';

@Component({
  selector: 'app-treatment-source-info',
  templateUrl: './treatment-source-info.component.html',
  styleUrls: ['./treatment-source-info.component.scss'],
})
export class TreatmentSourceInfoComponent
  implements OnInit, AfterContentChecked
{
  hasVaccinations: boolean;
  hasTests: boolean;

  @Input() formData: any;

  @Output() previous = new EventEmitter();
  @Output() submit = new EventEmitter();

  treatmentSourceInfo: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.hasVaccinations = this.formData.vaccinations?.length ? true : false;
    this.hasTests = this.formData.diagnosticTests?.length ? true : false;

    this.initForm();
    this.initConditionalValidation();
  }

  initForm() {
    this.treatmentSourceInfo = this.formBuilder.group({
      vaccinated: [this.hasVaccinations],
      vaccinations: [
        this.formData.vaccinations?.length ? this.formData.vaccinations : null,
      ],
      tested: [this.hasTests],
      tests: [this.formData.tests?.length ? this.formData.tests : null],
      treatmentDetails: [this.formData.treatmentDetails],
    });
  }

  get f() {
    return this.treatmentSourceInfo.value;
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  initConditionalValidation() {
    this.treatmentSourceInfo
      .get('vaccinated')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.treatmentSourceInfo
            .get('vaccinations')
            ?.setValidators([Validators.required]);
        } else {
          this.treatmentSourceInfo.controls.vaccinations?.clearValidators();
          this.treatmentSourceInfo.controls.vaccinations?.updateValueAndValidity();
        }

        this.hasVaccinations = value;
      });

    this.treatmentSourceInfo.get('tested')?.valueChanges.subscribe((value) => {
      if (value) {
        this.treatmentSourceInfo
          .get('tests')
          ?.setValidators([Validators.required]);
      } else {
        this.treatmentSourceInfo.controls.tests?.clearValidators();
        this.treatmentSourceInfo.controls.tests?.updateValueAndValidity();
      }

      this.hasTests = value;
    });
  }

  onVaccinationSubmitted(vaccination: any) {
    this.formData.vaccinations = [...this.formData.vaccinations, vaccination];
    this.treatmentSourceInfo.patchValue({
      vaccinations: this.formData.vaccinations,
    });
    this.treatmentSourceInfo.controls.vaccinations?.updateValueAndValidity();
  }

  onTestSubmitted(test: any) {
    this.formData.diagnosticTests = [...this.formData.diagnosticTests, test];
    this.treatmentSourceInfo.patchValue({
      diagnosticTests: this.formData.diagnosticTests,
    });
    this.treatmentSourceInfo.controls.tests?.updateValueAndValidity();
  }

  onPrevious() {
    this.previous.emit();
  }

  onSubmit() {
    this.submit.emit(this.f);
  }
}
