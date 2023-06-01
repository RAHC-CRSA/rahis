import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    DiagnosticTestDto,
    ICreateReportCommand,
    MedicationDto,
    VaccinationDto,
} from '../../../../../app/web-api-client';
import { ReportsState } from '../../store';
import { createReport } from '../../store/actions';
import { Router } from '@angular/router';

@Component({
    selector: 'app-report-create',
    templateUrl: './report-create.component.html',
    styleUrls: ['./report-create.component.scss'],
})
export class ReportCreateComponent implements OnInit {
    formStep: number = 1;
    stepTitle: string;
    stepDescription: string;

    steps = [
        {
            title: 'Report Type',
            description: 'Immediate or Follow Up report',
        },
        {
            title: 'Location',
            description: 'Country & region of occurrence',
        },
        {
            title: 'Disease Info',
            description: 'Species & disease information',
        },
        {
            title: 'Occurrence',
            description: 'Occurrence status & recorrence',
        },
        {
            title: 'Infection Info',
            description: 'Infestation effects & impact',
        },
        {
            title: 'Treatment Info',
            description: 'Treatment actions & measures',
        },
        {
            title: 'Treatment Source',
            description: 'Treatment sources',
        },
    ];

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
        medications: [],
        vaccinations: [],
        diagnosticTests: [],
    };

    constructor(private router: Router, private store: Store<ReportsState>) {}

    ngOnInit() {}

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

    previous() {
        if (this.formStep == 1) return;
        this.formStep--;
    }

    submit(formData: any) {
        console.log({ formData, currentValues: this.formValues });

        const medications = this.formValues.medications?.map(
            (e) => new MedicationDto(e)
        );
        const vaccinations = this.formValues.vaccinations?.map(
            (e) => new VaccinationDto(e)
        );
        const diagnosticTests = this.formValues.diagnosticTests?.map(
            (e) => new DiagnosticTestDto(e)
        );

        const payload: ICreateReportCommand = {
            regionId: parseInt(this.formValues.region),
            diseaseId: parseInt(this.formValues.disease),
            speciesId: parseInt(this.formValues.species),
            occurrenceId: this.formValues.occurrence
                ? parseInt(this.formValues.occurrence)
                : undefined,
            numberExposed: parseInt(this.formValues.exposed),
            numberInfected: parseInt(this.formValues.infected),
            mortality: parseInt(this.formValues.mortality),
            humanInfection: this.formValues.humanInfection,
            humansExposed: parseInt(this.formValues.humansExposed),
            humansInfected: parseInt(this.formValues.humansInfected),
            humansMortality: parseInt(this.formValues.humansMortality),
            stampingOut: this.formValues.stampingOut,
            destructionOfCorpses: this.formValues.destructionOfCorpses,
            corpsesDestroyed: this.formValues.corpsesDestroyed
                ? parseInt(this.formValues.corpsesDestroyed)
                : undefined,
            disinfection: this.formValues.disinfection,
            observation: this.formValues.observation,
            observationDuration: this.formValues.observationDuration,
            quarantine: this.formValues.quarantine,
            quarantineDuration: this.formValues.quarantineDuration,
            movementControl: this.formValues.movementControl,
            movementControlMeasures: this.formValues.movementControlMeasures,
            treatment: this.formValues.treatment,
            medications: medications,
            vaccinations: vaccinations,
            diagnosticTests: diagnosticTests,
        };

        console.log('Submitting', { payload });

        this.store.dispatch(createReport({ payload }));

        this.router.navigateByUrl('/reports/create/confirmation');
    }

    cancel() {}
}
