import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-treatment-info',
  templateUrl: './treatment-info.component.html',
  styleUrls: ['./treatment-info.component.scss'],
})
export class TreatmentInfoComponent implements OnInit {
  @Input() formData: any;

  @Output() previous = new EventEmitter();
  @Output() submit = new EventEmitter();

  treatmentInfo: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.treatmentInfo = this.formBuilder.group({});
  }

  onPrevious() {
    this.previous.emit();
  }

  onSubmit() {
    this.submit.emit(this.treatmentInfo.value);
  }
}
