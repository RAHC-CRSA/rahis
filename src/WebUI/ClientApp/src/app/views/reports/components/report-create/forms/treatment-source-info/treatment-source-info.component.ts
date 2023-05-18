import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-treatment-source-info',
  templateUrl: './treatment-source-info.component.html',
  styleUrls: ['./treatment-source-info.component.scss'],
})
export class TreatmentSourceInfoComponent implements OnInit {
  @Input() formData: any;

  @Output() previous = new EventEmitter();
  @Output() submit = new EventEmitter();

  treatmentSourceInfo: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.treatmentSourceInfo = this.formBuilder.group({});
  }

  onPrevious() {
    this.previous.emit();
  }

  onSubmit() {
    this.submit.emit(this.treatmentSourceInfo.value);
  }
}
