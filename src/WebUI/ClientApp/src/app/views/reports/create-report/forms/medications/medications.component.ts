import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-medications',
    templateUrl: './medications.component.html',
    styleUrls: ['./medications.component.scss'],
})
export class MedicationsComponent {
    medicationForm: FormGroup;

    @Output() submit = new EventEmitter();

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.initForm();
    }

    get f() {
        return this.medicationForm.value;
    }

    initForm() {
        this.medicationForm = this.formBuilder.group({
            name: ['', Validators.required],
            dosage: ['', Validators.required],
        });
    }

    onSubmit() {
        this.submit.emit(this.f);
        this.medicationForm.reset();
    }
}
