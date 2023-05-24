import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstitutionsState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { IAddInstitutionCommand } from 'src/app/web-api-client';
import { addInstitution } from '../../store/actions';

@Component({
  selector: 'app-institution-create',
  templateUrl: './institution-create.component.html',
  styleUrls: ['./institution-create.component.scss'],
})
export class InstitutionCreateComponent implements OnInit {
  institutionForm: FormGroup;
  hasError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<InstitutionsState>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.institutionForm = this.fb.group({
      name: ['', Validators.required],
      publicSector: ['', Validators.required],
      type: [''],
    });
  }

  get f() {
    return this.institutionForm.value;
  }

  submit() {
    const payload: IAddInstitutionCommand = {
      name: this.f.name,
      publicSector: this.f.publicSector,
      type: this.f.type,
    };

    this.store.dispatch(addInstitution({ payload }));
  }
}
