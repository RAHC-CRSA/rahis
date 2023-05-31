import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAddSpeciesCommand } from 'src/app/web-api-client';
import { addSpecies } from '../../store/actions';
import { SpeciesState } from '../../store/reducers';

@Component({
  selector: 'app-species-create',
  templateUrl: './species-create.component.html',
  styleUrls: ['./species-create.component.scss'],
})
export class SpeciesCreateComponent implements OnInit {
  speciesForm: FormGroup;

  constructor(private store: Store<SpeciesState>, private fb: FormBuilder) {}

  get f() {
    return this.speciesForm?.value;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.speciesForm = this.fb.group({
      name: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }

  submit() {
    const payload: IAddSpeciesCommand = {
      name: this.f.name,
    };

    this.store.dispatch(addSpecies({ payload }));
  }
}
