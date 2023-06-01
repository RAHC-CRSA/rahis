import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getParaProfessionals } from '../../../../store/reducers';
import { loadParaProfessionals } from '../../../../store/actions';
import { ReportsState } from '../../../../store';
import { ParaProfessionalDto } from '../../../../../../web-api-client';

@Component({
    selector: 'app-diagnostic-tests',
    templateUrl: './diagnostic-tests.component.html',
    styleUrls: ['./diagnostic-tests.component.scss'],
})
export class DiagnosticTestsComponent implements OnInit {
    testForm: FormGroup;
    @Output() submit = new EventEmitter();

    professionals$: Observable<ParaProfessionalDto[] | null | undefined>;
    constructor(private fb: FormBuilder, private store: Store<ReportsState>) {}

    ngOnInit() {
        this.store.dispatch(loadParaProfessionals({ payload: undefined }));
        this.professionals$ = this.store.select(getParaProfessionals);

        this.initForm();
    }

    get f() {
        return this.testForm.value;
    }

    initForm() {
        this.testForm = this.fb.group({
            name: ['', Validators.required],
            numberTested: ['', Validators.required],
            professionalId: ['', Validators.required],
        });
    }

    onSubmit() {
        this.submit.emit(this.f);
        this.testForm.reset();
    }
}
