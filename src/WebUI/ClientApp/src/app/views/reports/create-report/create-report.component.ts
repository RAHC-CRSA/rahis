import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { ReportState } from 'app/modules/reports/store';
import { createReport } from 'app/modules/reports/store/actions';
import {
    getFeedback,
    getReportsLoading,
} from 'app/modules/reports/store/selectors';
import {
    DiagnosticTestDto,
    ICreateReportCommand,
    MedicationDto,
    ServerResponse,
    VaccinationDto,
} from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-create-report',
    templateUrl: './create-report.component.html',
    styleUrls: ['./create-report.component.scss'],
    animations: fuseAnimations,
})
export class CreateReportComponent implements OnInit {
    loading$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    @ViewChild('reportFormStepper') private reportFormStepper: MatStepper;

    formStep: number = 1;
    formValues = this._getFormValues();

    constructor(private router: Router, private store: Store<ReportState>) {}

    ngOnInit() {
        this.initData();
    }

    initData() {
        this.loading$ = this.store.select(getReportsLoading);
        this.feedback$ = this.store.select(getFeedback);
    }

    next(formData: any) {
        if (this.formStep == 10) return;

        if (this.formStep == 1) {
            this.formValues.reportType = formData.reportType;

            this.formStep++;

            this.reportFormStepper.selected.completed = true;
            this.reportFormStepper.next();
            return;
        }

        if (this.formStep == 2) {
            // Capture form values
            this.formValues.country = formData.country;
            this.formValues.region = formData.region;
            this.formValues.municipality = formData.municipality;
            this.formValues.district = formData.district;
            this.formValues.community = formData.community;

            this.formStep++;

            this.reportFormStepper.selected.completed = true;
            this.reportFormStepper.next();
            return;
        }

        if (this.formStep == 3) {
            // Capture form values
            this.formValues.disease = formData.disease;
            this.formValues.species = formData.species;

            this.formStep++;

            this.reportFormStepper.selected.completed = true;
            this.reportFormStepper.next();
            return;
        }

        if (this.formStep == 4) {
            // Capture form values
            this.formValues.newOccurrence = formData.newOccurrence;
            this.formValues.occurrence =
                formData.occurrence == 'other' || formData.occurrence == null
                    ? undefined
                    : formData.occurrence;

            this.formStep++;

            this.reportFormStepper.selected.completed = true;
            this.reportFormStepper.next();
            return;
        }

        if (this.formStep == 5) {
            this.formStep++;

            this.reportFormStepper.selected.completed = true;
            this.reportFormStepper.next();
            return;
        }

        if (this.formStep == 6) {
            // Capture form values
            this.formValues.exposed = formData.numberExposed;
            this.formValues.infected = formData.numberInfected;
            this.formValues.dead = formData.numberDead;
            this.formValues.mortality = Math.round(
                (formData.numberDead / formData.numberExposed) * 100
            );
            this.formValues.humanInfection = formData.humanInfection;
            this.formValues.humansExposed = formData.humansExposed;
            this.formValues.humansInfected = formData.humansInfected;
            this.formValues.humansDead = formData.humansDead;
            this.formValues.humansMortality = Math.round(
                (formData.humansDead / formData.humansExposed) * 100
            );

            this.formStep++;

            this.reportFormStepper.selected.completed = true;
            this.reportFormStepper.next();
            return;
        }

        if (this.formStep == 7) {
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
            this.formValues.treatmentDetails = formData.treatmentDetails;
            this.formValues.medications = formData.medications;

            this.formStep++;

            this.reportFormStepper.selected.completed = true;
            this.reportFormStepper.next();
            return;
        }

        if (this.formStep == 8) {
            this.formValues.diagnosticTests = formData.tests;

            this.formStep++;

            this.reportFormStepper.selected.completed = true;
            this.reportFormStepper.next();
            return;
        }

        if (this.formStep == 9) {
            this.formValues.vaccinations = formData.vaccinations;

            this.submit();
        }
    }

    previous() {
        if (this.formStep == 1) return;

        this.formStep--;
        this.reportFormStepper.previous();
    }

    cancel() {
        this.router.navigateByUrl('/dashboard/reports');
    }

    submit() {
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
            countryId: parseInt(this.formValues.country),
            regionId: parseInt(this.formValues.region),
            municipalityId: parseInt(this.formValues.municipality),
            districtId: parseInt(this.formValues.district),
            communityId: parseInt(this.formValues.community),
            diseaseId: parseInt(this.formValues.disease),
            speciesId: parseInt(this.formValues.species),
            occurrenceId: this.formValues.occurrence
                ? parseInt(this.formValues.occurrence)
                : undefined,
            numberExposed: this.formValues.exposed,
            numberInfected: this.formValues.infected,
            mortality: this.formValues.mortality,
            humanInfection: this.formValues.humanInfection,
            humansExposed: this.formValues.humansExposed,
            humansInfected: this.formValues.humansInfected,
            humansMortality: this.formValues.humansMortality,
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
            treatmentDetails: this.formValues.treatmentDetails,
            medications: medications,
            vaccinations: vaccinations,
            diagnosticTests: diagnosticTests,
        };

        console.log({ payload });

        this.store.dispatch(createReport({ payload }));
        this.router.navigateByUrl('/dashboard/reports/create-confirmation');
    }

    private _getFormValues() {
        return {
            reportId: null,
            reportType: '',
            country: '',
            region: '',
            municipality: '',
            district: '',
            community: '',
            disease: '',
            species: '',
            newOccurrence: false,
            occurrence: '',
            exposed: 0,
            infected: 0,
            dead: 0,
            mortality: 0,
            humanInfection: false,
            humansExposed: 0,
            humansInfected: 0,
            humansDead: 0,
            humansMortality: 0,
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
    }
}
