import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReportsState } from 'src/app/views/reports/store';
import { getParaProfessionals } from 'src/app/views/reports/store/reducers';
import { loadParaProfessionals } from 'src/app/views/reports/store/actions';
import { ParaProfessionalDto } from 'src/app/web-api-client';

@Component({
  selector: 'app-vaccinations',
  templateUrl: './vaccinations.component.html',
  styleUrls: ['./vaccinations.component.scss'],
})
export class VaccinationsComponent implements OnInit {
  @Output() submit = new EventEmitter();
  vaccinationForm: FormGroup;
  professionals$: Observable<ParaProfessionalDto[] | null | undefined>;

  constructor(private fb: FormBuilder, private store: Store<ReportsState>) {}

  ngOnInit() {
    this.store.dispatch(loadParaProfessionals({ payload: undefined }));
    this.professionals$ = this.store.select(getParaProfessionals);

    this.initForm();
  }

  initForm() {
    this.vaccinationForm = this.fb.group({
      name: ['', Validators.required],
      numberVaccinated: ['', Validators.required],
      isAnimal: [false, Validators.required],
      isHuman: [false, Validators.required],
      professionalId: [''],
    });
  }

  get f() {
    return this.vaccinationForm.value;
  }

  onSubmit() {
    this.submit.emit(this.f);
    this.vaccinationForm.reset();
  }
}
