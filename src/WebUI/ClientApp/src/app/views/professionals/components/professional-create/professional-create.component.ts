import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  IAddParaProfessionalCommand,
  InstitutionDto,
} from 'src/app/web-api-client';
import { ParaProfessionalsState, getInstitutions } from '../../store/reducers';
import { Store } from '@ngrx/store';
import {
  addParaProfessional,
  loadInstitutions,
} from '../../store/actions/professionals.actions';

@Component({
  selector: 'app-professional-create',
  templateUrl: './professional-create.component.html',
  styleUrls: ['./professional-create.component.scss'],
})
export class ProfessionalCreateComponent implements OnInit {
  professionalForm: FormGroup;
  institutions$: Observable<InstitutionDto[] | null | undefined>;
  hasError: boolean = false;
  hasFeedback: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<ParaProfessionalsState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadInstitutions());
    this.institutions$ = this.store.select(getInstitutions);

    this.initForm();
  }

  initForm() {
    this.professionalForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      institution: ['', Validators.required],
    });
  }

  get f() {
    return this.professionalForm?.value;
  }

  submit() {
    const payload: IAddParaProfessionalCommand = {
      name: this.f.name,
      position: this.f.position,
      email: this.f.email,
      phone: this.f.phone,
      institutionId: this.f.institution,
    };

    this.store.dispatch(addParaProfessional({ payload }));
  }
}
