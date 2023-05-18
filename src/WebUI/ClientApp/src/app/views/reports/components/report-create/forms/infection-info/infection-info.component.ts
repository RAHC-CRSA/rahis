import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-infection-info',
  templateUrl: './infection-info.component.html',
  styleUrls: ['./infection-info.component.scss'],
})
export class InfectionInfoComponent implements OnInit {
  @Input() formData: any;

  @Output() previous = new EventEmitter();
  @Output() submit = new EventEmitter();

  occurrences: any[];

  infectionInfo: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.infectionInfo = this.formBuilder.group({
      numberExposed: [this.formData.exposed, Validators.required],
      numberInfected: [this.formData.infected, Validators.required],
      mortality: [this.formData.mortality, Validators.required],
    });
  }

  get f() {
    return this.infectionInfo.value;
  }

  onPrevious() {
    this.previous.emit();
  }

  onSubmit() {
    this.submit.emit(this.infectionInfo.value);
  }
}
