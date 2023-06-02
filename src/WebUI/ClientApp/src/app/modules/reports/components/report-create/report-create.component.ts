import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    CountryDto,
    DiagnosticTestDto,
    ICreateReportCommand,
    MedicationDto,
    RegionDto,
    VaccinationDto,
} from '../../../../../app/web-api-client';
import { ReportsState } from '../../store';
import { createReport, loadCountries, loadRegions } from '../../store/actions';
import { Router } from '@angular/router';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { getCountries, getRegions } from '../../store/reducers';
import { MatStepper } from '@angular/material/stepper';

@Component({
    selector: 'app-report-create',
    templateUrl: './report-create.component.html',
    styleUrls: ['./report-create.component.scss'],
})
export class ReportCreateComponent implements OnInit {
    @ViewChild('reportFormStepper') private reportFormStepper: MatStepper;

    horizontalStepperForm: FormGroup;
    reportForm: FormGroup;

    countryControl = new FormControl();
    selectedCountry: CountryDto;
    countries$: Observable<CountryDto[] | null | undefined>;
    countries: CountryDto[];
    filteredCountries: Observable<CountryDto[]>;

    regions$: Observable<RegionDto[] | null | undefined>;

    hasVaccinations: boolean;
    hasTests: boolean;

    formStep: number = 1;
    stepTitle: string;
    stepDescription: string;

    formValues = {
        reportId: null,
        reportType: '',
        country: '',
        region: '',
        disease: '',
        species: '',
        newOccurrence: false,
        occurrence: '',
        exposed: '',
        infected: '',
        mortality: '',
        humanInfection: false,
        humansExposed: '',
        humansInfected: '',
        humansMortality: '',
        stampingOut: false,
        destructionOfCorpses: false,
        corpsesDestroyed: '',
        disinfection: false,
        observation: false,
        observationDuration: '',
        quarantine: false,
        quarantineDuration: '',
        movementControl: false,
        movementControlMeasures: '',
        treatment: false,
        treatmentDetails: '',
        medications: [],
        vaccinations: [],
        diagnosticTests: [],
    };

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private store: Store<ReportsState>
    ) {}

    ngOnInit() {
        this.initForm();
        this.initData();
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
                    name ? this._filter(name) : this.countries.slice()
                )
            );
        });

        this.regions$ = this.store.select(getRegions);
    }

    initForm() {
        this.reportForm = this._formBuilder.group({
            reportTypeChoice: this._formBuilder.group({
                reportType: [this.formValues.reportType, [Validators.required]],
            }),
            locationInfo: this._formBuilder.group({
                country: [this.formValues.country, [Validators.required]],
                region: [this.formValues.region, [Validators.required]],
            }),
            diseaseInfo: this._formBuilder.group({
                disease: [this.formValues.disease, [Validators.required]],
                species: [this.formValues.species, [Validators.required]],
            }),
            occurrenceInfo: this._formBuilder.group({
                newOccurrence: [this.formValues.newOccurrence],
                occurrence: [this.formValues.occurrence],
            }),
            infectionInfo: this._formBuilder.group({
                numberExposed: [this.formValues.exposed, [Validators.required]],
                numberInfected: [
                    this.formValues.infected,
                    [Validators.required],
                ],
                mortality: [this.formValues.mortality, [Validators.required]],
                humanInfection: [false, [Validators.required]],
                humansExposed: [this.formValues.humansExposed],
                humansInfected: [this.formValues.humansInfected],
                humansMortality: [this.formValues.humansMortality],
            }),
            treatmentInfo: this._formBuilder.group({
                stampingOut: [
                    this.formValues.stampingOut,
                    [Validators.required],
                ],
                destructionOfCorpses: [
                    this.formValues.destructionOfCorpses,
                    [Validators.required],
                ],
                corpsesDestroyed: [this.formValues.corpsesDestroyed],
                disinfection: [
                    this.formValues.disinfection,
                    [Validators.required],
                ],
                observation: [
                    this.formValues.observation,
                    [Validators.required],
                ],
                observationDuration: [this.formValues.observationDuration],
                quarantine: [this.formValues.quarantine, [Validators.required]],
                quarantineDuration: [this.formValues.quarantineDuration],
                movementControl: [
                    this.formValues.movementControl,
                    [Validators.required],
                ],
                movementControlMeasures: [
                    this.formValues.movementControlMeasures,
                ],
                treatment: [this.formValues.treatment, [Validators.required]],
                medications: [
                    this.formValues.medications?.length
                        ? this.formValues.medications
                        : null,
                ],
            }),
            treatmentSourceInfo: this._formBuilder.group({
                vaccinated: [this.hasVaccinations],
                vaccinations: [
                    this.formValues.vaccinations?.length
                        ? this.formValues.vaccinations
                        : null,
                ],
                tested: [this.hasTests],
                tests: [
                    this.formValues.diagnosticTests?.length
                        ? this.formValues.diagnosticTests
                        : null,
                ],
                treatmentDetails: [this.formValues.treatmentDetails],
            }),
        });
    }

    next(formData: any) {
        if (this.formStep == 7) return;

        console.log({ formData, currentValues: this.formValues });

        if (this.formStep == 1) {
            this.formValues.reportType = formData;

            this.formStep++;
            return;
        }

        if (this.formStep == 2) {
            // Capture form values
            this.formValues.country = formData.country;
            this.formValues.region = formData.region;

            this.formStep++;
            return;
        }

        if (this.formStep == 3) {
            // Capture form values
            this.formValues.disease = formData.disease;
            this.formValues.species = formData.species;

            // console.log({ values: this.formValues });

            this.formStep++;
            return;
        }

        if (this.formStep == 4) {
            // Capture form values
            this.formValues.newOccurrence = formData.newOccurrence;
            this.formValues.occurrence =
                formData.occurrence == 'other'
                    ? undefined
                    : formData.occurrence;

            console.log('Current Value', { current: this.formValues });

            this.formStep++;
            return;
        }

        if (this.formStep == 5) {
            // Capture form values
            this.formValues.exposed = formData.numberExposed;
            this.formValues.infected = formData.numberInfected;
            this.formValues.mortality = formData.mortality;
            this.formValues.humanInfection = formData.humanInfection;
            this.formValues.humansExposed = formData.humansExposed;
            this.formValues.humansInfected = formData.humansInfected;
            this.formValues.humansMortality = formData.humansMortality;

            // const occurrence =
            //   formData.occurrence == 'other'
            //     ? undefined
            //     : parseInt(this.formValues.occurrence);

            // console.log('Occurrence: ', { occurrence, value: formData.occurence });

            // const payload: ICreateReportCommand = {
            //   regionId: parseInt(this.formValues.region),
            //   diseaseId: parseInt(this.formValues.disease),
            //   speciesId: parseInt(this.formValues.species),
            //   occurrenceId: parseInt(this.formValues.occurrence),
            //   numberExposed: parseInt(this.formValues.exposed),
            //   numberInfected: parseInt(this.formValues.infected),
            //   mortality: parseInt(this.formValues.mortality),
            // };

            // this.store.dispatch(createReport({ payload }));

            this.formStep++;
            return;
        }

        if (this.formStep == 6) {
            // Capture form values
            this.formValues.stampingOut = formData.stampingOut;
            this.formValues.destructionOfCorpses =
                formData.destructionOfCorpses;
            this.formValues.corpsesDestroyed = formData.corpsesDestroyed;
            this.formValues.disinfection = formData.disinfection;
            this.formValues.observation = formData.observation;
            this.formValues.observationDuration = formData.observationDuration;
            this.formValues.quarantine = formData.quarantine;
            this.formValues.quarantineDuration = formData.quarantineDuration;
            this.formValues.movementControl = formData.movementControl;
            this.formValues.movementControlMeasures =
                formData.movementControlMeasures;
            this.formValues.treatment = formData.treatment;
            this.formValues.medications = formData.medications;

            this.formStep++;
            return;
        }
    }

    get f() {
        return this.reportForm.controls;
    }

    // onCountryChange() {
    //     if (this.f.country.value != '')
    //         this.store.dispatch(loadRegions({ payload: this.f.country.value }));
    // }

    private _filter(name: string): CountryDto[] {
        return this.countries.filter(
            (option) =>
                option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
        );
    }

    displayFn(country: CountryDto): string {
        return country ? country.name : '';
    }

    updateSelectedCountry(event: any, stepper: MatStepper) {
        this.selectedCountry = event.option.value;
        const country: CountryDto = event.option.value;

        // this.reportForm.patchValue({ country: country.id });

        console.log({ values: this.reportForm.value });

        this.store.dispatch(loadRegions({ payload: country.id }));

        this.reportFormStepper.next();
    }

    doNextStep() {
        console.log('Stepping...');
        this.reportFormStepper.selected.completed = true;
        this.reportFormStepper.next();
    }

    previous() {
        if (this.formStep == 1) return;
        this.formStep--;
    }

    submit() {
        console.log({ data: this.reportForm.value });
    }

    // submit(formData: any) {
    //     console.log({ formData, currentValues: this.formValues });

    //     const medications = this.formValues.medications?.map(
    //         (e) => new MedicationDto(e)
    //     );
    //     const vaccinations = this.formValues.vaccinations?.map(
    //         (e) => new VaccinationDto(e)
    //     );
    //     const diagnosticTests = this.formValues.diagnosticTests?.map(
    //         (e) => new DiagnosticTestDto(e)
    //     );

    //     const payload: ICreateReportCommand = {
    //         regionId: parseInt(this.formValues.region),
    //         diseaseId: parseInt(this.formValues.disease),
    //         speciesId: parseInt(this.formValues.species),
    //         occurrenceId: this.formValues.occurrence
    //             ? parseInt(this.formValues.occurrence)
    //             : undefined,
    //         numberExposed: parseInt(this.formValues.exposed),
    //         numberInfected: parseInt(this.formValues.infected),
    //         mortality: parseInt(this.formValues.mortality),
    //         humanInfection: this.formValues.humanInfection,
    //         humansExposed: parseInt(this.formValues.humansExposed),
    //         humansInfected: parseInt(this.formValues.humansInfected),
    //         humansMortality: parseInt(this.formValues.humansMortality),
    //         stampingOut: this.formValues.stampingOut,
    //         destructionOfCorpses: this.formValues.destructionOfCorpses,
    //         corpsesDestroyed: this.formValues.corpsesDestroyed
    //             ? parseInt(this.formValues.corpsesDestroyed)
    //             : undefined,
    //         disinfection: this.formValues.disinfection,
    //         observation: this.formValues.observation,
    //         observationDuration: this.formValues.observationDuration,
    //         quarantine: this.formValues.quarantine,
    //         quarantineDuration: this.formValues.quarantineDuration,
    //         movementControl: this.formValues.movementControl,
    //         movementControlMeasures: this.formValues.movementControlMeasures,
    //         treatment: this.formValues.treatment,
    //         medications: medications,
    //         vaccinations: vaccinations,
    //         diagnosticTests: diagnosticTests,
    //     };

    //     console.log('Submitting', { payload });

    //     this.store.dispatch(createReport({ payload }));

    //     this.router.navigateByUrl('/reports/create/confirmation');
    // }

    cancel() {}
}
