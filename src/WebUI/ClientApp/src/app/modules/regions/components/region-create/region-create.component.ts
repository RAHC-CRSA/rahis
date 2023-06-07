import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CountryDto, IAddRegionCommand } from 'src/app/web-api-client';
import { addRegion, loadCountries } from '../../store/actions';
import { getCountries, RegionsState } from '../../store/reducers';

@Component({
  selector: 'app-region-create',
  templateUrl: './region-create.component.html',
  styleUrls: ['./region-create.component.scss'],
})
export class RegionCreateComponent implements OnInit {
  regionForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;

  countries$: Observable<CountryDto[] | null | undefined>;

  constructor(private fb: FormBuilder, private store: Store<RegionsState>) {}

  ngOnInit() {
    this.initForm();

    this.store.dispatch(loadCountries());
    this.countries$ = this.store.select(getCountries);
  }

  get f() {
    return this.regionForm?.value;
  }

  initForm() {
    this.regionForm = this.fb.group({
      name: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      code: [null],
      country: [null, Validators.compose([Validators.required])],
    });
  }

  submit() {
    const payload: IAddRegionCommand = {
      name: this.f.name,
      code: this.f.code,
      countryId: this.f.country,
    };

    console.log({ payload });

    this.store.dispatch(addRegion({ payload }));
  }
}
