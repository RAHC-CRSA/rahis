import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-report-type',
    templateUrl: './report-type.component.html',
    styleUrls: ['./report-type.component.scss'],
})
export class ReportTypeComponent implements OnInit {
    @Input() formData: any;

    reportTypeForm: FormGroup;

    @Output() submit = new EventEmitter();

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.reportTypeForm = this.formBuilder.group({
            reportType: [this.formData.reportType, [Validators.required]],
        });
    }

    get f() {
        return this.reportTypeForm.controls;
    }

    onSubmit() {
        this.submit.emit(this.reportTypeForm.value);
    }
}
