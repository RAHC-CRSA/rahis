import {
    AfterContentChecked,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { ReportState } from 'app/modules/reports/store';
import {
    loadCommunities,
    loadCountries,
    loadDistricts,
    loadMunicipalities,
    loadRegions,
} from 'app/modules/reports/store/actions';
import {
    getCommunities,
    getCountries,
    getDistricts,
    getMunicipalities,
    getRegions,
} from 'app/modules/reports/store/selectors';
import {
    CommunityDto,
    CountryDto,
    DistrictDto,
    IAddRegionCommand,
    MunicipalityDto,
    RegionDto,
} from 'app/web-api-client';
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-location-info',
    templateUrl: './location-info.component.html',
    styleUrls: ['./location-info.component.scss'],
    animations: fuseAnimations,
})
export class LocationInfoComponent implements OnInit, AfterContentChecked {
    @Input() formData: any;

    otherOption: string = 'Other';
    newRegion: boolean = false;

    countryControl = new FormControl();
    regionControl = new FormControl();
    municipalityControl = new FormControl();
    districtControl = new FormControl();
    communityControl = new FormControl();

    selectedCountry: CountryDto;
    selectedRegion: RegionDto;
    selectedMunicipality: RegionDto;
    selectedDistrict: RegionDto;
    selectedCommunity: RegionDto;

    countries$: Observable<CountryDto[] | null | undefined>;
    countries: CountryDto[];
    filteredCountries: Observable<CountryDto[]>;

    regions$: Observable<RegionDto[] | null | undefined>;
    regions: RegionDto[];
    filteredRegions: Observable<RegionDto[]>;

    municipalities$: Observable<MunicipalityDto[] | null | undefined>;
    municipalities: MunicipalityDto[];
    filteredMunicipalities: Observable<MunicipalityDto[]>;

    districts$: Observable<DistrictDto[] | null | undefined>;
    districts: DistrictDto[];
    filteredDistricts: Observable<DistrictDto[]>;

    communities$: Observable<CommunityDto[] | null | undefined>;
    communities: CommunityDto[];
    filteredCommunities: Observable<CommunityDto[]>;

    @Output() previous = new EventEmitter();
    @Output() submit = new EventEmitter();

    locationInfo: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private changeDetector: ChangeDetectorRef,
        private store: Store<ReportState>
    ) {}

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    ngOnInit() {
        this.initForm();
        this.initData();
    }

    initForm() {
        this.locationInfo = this.formBuilder.group({
            country: [this.formData.country, [Validators.required]],
            region: [this.formData.region, [Validators.required]],
            municipality: [this.formData.municipality],
            district: [this.formData.district],
            community: [this.formData.community],
        });
    }

    initData() {
        this.store.dispatch(loadCountries());

        this.countries$ = this.store.select(getCountries);
        this.countries$.subscribe((countries) => {
            this.countries = countries;

            this.filteredCountries = this.countryControl.valueChanges.pipe(
                startWith({} as CountryDto),
                map((country) =>
                    country && typeof country === 'object'
                        ? country.name
                        : country
                ),
                map((name: string) =>
                    name ? this._filterCountry(name) : this.countries.slice()
                )
            );
        });

        this.regions$ = this.store.select(getRegions);
        this.regions$.subscribe((regions) => {
            this.regions = [
                ...regions,
                new RegionDto({ id: null, name: this.otherOption }),
            ];

            this.filteredRegions = this.regionControl.valueChanges.pipe(
                startWith({} as RegionDto),
                map((region) =>
                    region && typeof region === 'object' ? region.name : region
                ),
                map((name: string) =>
                    name ? this._filterRegion(name) : this.regions.slice()
                )
            );
        });

        this.municipalities$ = this.store.select(getMunicipalities);
        this.municipalities$.subscribe((municipalities) => {
            this.municipalities = municipalities;

            this.filteredMunicipalities =
                this.municipalityControl.valueChanges.pipe(
                    startWith({} as MunicipalityDto),
                    map((municipality) =>
                        municipality && typeof municipality === 'object'
                            ? municipality.name
                            : municipality
                    ),
                    map((name: string) =>
                        name
                            ? this._filterMunicipality(name)
                            : this.municipalities.slice()
                    )
                );
        });

        this.districts$ = this.store.select(getDistricts);
        this.districts$.subscribe((districts) => {
            this.districts = districts;

            this.filteredDistricts = this.districtControl.valueChanges.pipe(
                startWith({} as DistrictDto),
                map((district) =>
                    district && typeof district === 'object'
                        ? district.name
                        : district
                ),
                map((name: string) =>
                    name ? this._filterDistrict(name) : this.districts.slice()
                )
            );
        });

        this.communities$ = this.store.select(getCommunities);
        this.communities$.subscribe((communities) => {
            this.communities = communities;

            this.filteredCommunities = this.communityControl.valueChanges.pipe(
                startWith({} as CommunityDto),
                map((community) =>
                    community && typeof community === 'object'
                        ? community.name
                        : community
                ),
                map((name: string) =>
                    name
                        ? this._filterCommunity(name)
                        : this.communities.slice()
                )
            );
        });
    }

    get f() {
        return this.locationInfo.value;
    }

    // Country field
    private _filterCountry(name: string): CountryDto[] {
        return this.countries.filter(
            (option) =>
                option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
        );
    }

    displayCountryFn(country: CountryDto): string {
        return country ? country.name : '';
    }

    updateSelectedCountry(event: any) {
        this.selectedCountry = event.option.value;
        const country: CountryDto = event.option.value;

        this.locationInfo.patchValue({ country: country.id });

        this.regionControl.setValue('', { emitEvent: true });
        this.districtControl.setValue('', { emitEvent: true });
        this.communityControl.setValue('', { emitEvent: true });

        this.store.dispatch(loadRegions({ payload: country.id }));
    }

    // Municipality field
    private _filterMunicipality(name: string): MunicipalityDto[] {
        return this.municipalities.filter(
            (option) =>
                option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
        );
    }

    displayMunicipalityFn(municipality: MunicipalityDto): string {
        return municipality ? municipality.name : '';
    }

    updateSelectedMunicipality(event: any) {
        this.selectedMunicipality = event.option.value;
        const municipality: MunicipalityDto = event.option.value;

        this.locationInfo.patchValue({ municipality: municipality.id });

        this.districtControl.setValue('', { emitEvent: true });
        this.communityControl.setValue('', { emitEvent: true });

        this.store.dispatch(loadDistricts({ payload: municipality.id }));
    }

    // District field
    private _filterDistrict(name: string): CountryDto[] {
        return this.districts.filter(
            (option) =>
                option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
        );
    }

    displayDistrictFn(district: DistrictDto): string {
        return district ? district.name : '';
    }

    updateSelectedDistrict(event: any) {
        this.selectedDistrict = event.option.value;
        const district: DistrictDto = event.option.value;

        this.locationInfo.patchValue({ district: district.id });

        this.communityControl.setValue('', { emitEvent: true });

        this.store.dispatch(loadCommunities({ payload: district.id }));
    }

    // Community field
    private _filterCommunity(name: string): CommunityDto[] {
        return this.communities.filter(
            (option) =>
                option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
        );
    }

    displayCommunityFn(community: CommunityDto): string {
        return community ? community.name : '';
    }

    updateSelectedCommunity(event: any) {
        this.selectedCommunity = event.option.value;
        const community: CommunityDto = event.option.value;

        this.locationInfo.patchValue({ community: community.id });
    }

    // Region field
    private _filterRegion(name: string): RegionDto[] {
        return this.regions.filter(
            (option) =>
                option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
        );
    }

    displayRegionFn(region: RegionDto): string {
        return region ? region.name : '';
    }

    updateSelectedRegion(event: any) {
        this.selectedRegion = event.option.value;
        const region: RegionDto = event.option.value;

        this.newRegion =
            region.name.toLowerCase() === this.otherOption.toLowerCase();

        this.locationInfo.patchValue({ region: region.id });

        this.municipalityControl.setValue('', { emitEvent: true });
        this.districtControl.setValue('', { emitEvent: true });
        this.communityControl.setValue('', { emitEvent: true });

        this.store.dispatch(loadMunicipalities({ payload: region.id }));

        if (this.newRegion) this.regionControl.disable();
    }

    onCheckRegion(isNew: boolean) {
        this.newRegion = isNew;

        if (!this.newRegion) {
            this.regionControl.enable();
        }
    }

    onAddRegionClosed() {
        this.onCheckRegion(false);
        this.regionControl.setValue('', { emitEvent: true });
        this.locationInfo.patchValue({ region: '' }, { emitEvent: true });
    }

    onPrevious() {
        this.previous.emit();
    }

    onSubmit() {
        this.submit.emit(this.locationInfo.value);
    }

    onCountryChange() {
        if (this.f.country != '')
            this.store.dispatch(loadRegions({ payload: this.f.country }));
    }
}
