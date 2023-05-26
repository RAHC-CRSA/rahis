import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectorRef,
  AfterContentChecked,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-infection-info',
  templateUrl: './infection-info.component.html',
  styleUrls: ['./infection-info.component.scss'],
})
export class InfectionInfoComponent implements OnInit, AfterContentChecked {
  humanInfection: boolean;
  @Input() formData: any;

  @Output() previous = new EventEmitter();
  @Output() submit = new EventEmitter();

  occurrences: any[];

  infectionInfo: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.humanInfection = this.formData.humanInfection;
    this.initForm();

    this.infectionInfo
      .get('humanInfection')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.infectionInfo
            .get('humansExposed')
            ?.setValidators([Validators.required]);
          this.infectionInfo
            .get('humansInfected')
            ?.setValidators([Validators.required]);
          this.infectionInfo
            .get('humansMortality')
            ?.setValidators([Validators.required]);
        } else {
          this.infectionInfo.controls.humansExposed?.clearValidators();
          this.infectionInfo.controls.humansExposed?.updateValueAndValidity();
          this.infectionInfo.controls.humansInfected?.clearValidators();
          this.infectionInfo.controls.humansInfected?.updateValueAndValidity();
          this.infectionInfo.controls.humansMortality?.clearValidators();
          this.infectionInfo.controls.humansMortality?.updateValueAndValidity();
        }
      });
  }

  initForm() {
    this.infectionInfo = this.formBuilder.group({
      numberExposed: [this.formData.exposed, Validators.required],
      numberInfected: [this.formData.infected, Validators.required],
      mortality: [this.formData.mortality, Validators.required],
      humanInfection: [false, Validators.compose([Validators.required])],
      humansExposed: [this.formData.humansExposed],
      humansInfected: [this.formData.humansInfected],
      humansMortality: [this.formData.humansMortality],
    });
  }

  get f() {
    return this.infectionInfo.value;
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  onHumanInfectionChange(value: boolean) {
    this.humanInfection = value;
  }

  onPrevious() {
    this.previous.emit();
  }

  onSubmit() {
    this.submit.emit(this.infectionInfo.value);
  }
}
