import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getCountries, getRegions } from '../../../../store/reducers';
import { ReportsState } from '../../../../store';
import { CountryDto, RegionDto } from '../../../../../../web-api-client';
import { Observable } from 'rxjs';
import { loadCountries, loadRegions } from '../../../../store/actions';

@Component({
    selector: 'app-location-info',
    templateUrl: './location-info.component.html',
    styleUrls: ['./location-info.component.scss'],
})
export class LocationInfoComponent implements OnInit {
    @Input() formData: any;

    countries$: Observable<CountryDto[] | null | undefined>;
    regions$: Observable<RegionDto[] | null | undefined>;

    @Output() previous = new EventEmitter();
    @Output() submit = new EventEmitter();

    locationInfo: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private reportsStore: Store<ReportsState>
    ) {}

    ngOnInit() {
        this.initForm();
        this.reportsStore.dispatch(loadCountries());
        this.countries$ = this.reportsStore.select(getCountries);
        this.regions$ = this.reportsStore.select(getRegions);
    }

    initForm() {
        this.locationInfo = this.formBuilder.group({
            country: [this.formData.country, Validators.required],
            region: [this.formData.region, Validators.required],
        });
    }

    get f() {
        return this.locationInfo.value;
    }

    onPrevious() {
        this.previous.emit();
    }

    onSubmit() {
        this.submit.emit(this.locationInfo.value);
    }

    onCountryChange() {
        if (this.f.country != '')
            this.reportsStore.dispatch(
                loadRegions({ payload: this.f.country })
            );
    }
}
