import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAddDiseaseCommand } from 'src/app/web-api-client';
import { addDisease } from '../../store/actions/diseases.actions';
import { DiseaseState } from '../../store/reducers';

@Component({
  selector: 'app-disease-create',
  templateUrl: './disease-create.component.html',
  styleUrls: ['./disease-create.component.scss'],
})
export class DiseaseCreateComponent implements OnInit {
  diseaseForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<DiseaseState>) {}

  get f() {
    return this.diseaseForm?.value;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.diseaseForm = this.fb.group({
      name: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      code: [null],
      classification: [null],
      zoonotic: [null, Validators.compose([Validators.required])],
    });
  }

  submit() {
    const payload: IAddDiseaseCommand = {
      name: this.f.name,
      code: this.f.code,
      classification: this.f.classification,
      zoonotic: this.f.zoonotic,
    };

    console.log({ payload });

    this.store.dispatch(addDisease({ payload }));
  }
}
