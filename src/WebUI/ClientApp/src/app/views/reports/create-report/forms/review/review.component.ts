import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReportState } from 'app/modules/reports/store';
import { getReportsLoading } from 'app/modules/reports/store/selectors';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
    @Input() formData: any;

    @Output() submit = new EventEmitter();

    loading$: Observable<boolean>;

    reviewForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<ReportState>
    ) {}

    ngOnInit() {
        this.initData();
        this.initForm();
    }

    initData() {
        this.loading$ = this.store.select(getReportsLoading);
    }

    initForm() {
        this.reviewForm = this.formBuilder.group({
            reportType: [this.formData.reportType, [Validators.required]],
            country: [this.formData.country, [Validators.required]],
            region: [this.formData.region, [Validators.required]],
            municipality: [this.formData.municipality],
            district: [this.formData.district],
            community: [this.formData.community],
            disease: [this.formData.disease, Validators.required],
            species: [this.formData.species, Validators.required],
            newOccurrence: [this.formData.newOccurrence],
            occurrence: [this.formData.occurrence],
            exposed: [this.formData.exposed, Validators.required],
            infected: [this.formData.infected, Validators.required],
            dead: [this.formData.dead, Validators.required],
            humanInfection: [
                this.formData.humanInfection,
                // Validators.compose([Validators.required]),
            ],
            humansExposed: [this.formData.humansExposed],
            humansInfected: [this.formData.humansInfected],
            stampingOut: [this.formData.stampingOut, Validators.required],
            destructionOfCorpses: [
                this.formData.destructionOfCorpses,
                //  Validators.required,
            ],
            corpsesDestroyed: [this.formData.corpsesDestroyed],
            disinfection: [this.formData.disinfection, Validators.required],
            observation: [
                this.formData.observation,
                //   Validators.required
            ],
            observationDuration: [this.formData.observationDuration],
            observationDurationSuffix: [
                this.formData.observationDurationSuffix,
            ],
            quarantine: [this.formData.quarantine, Validators.required],
            quarantineDuration: [this.formData.quarantineDuration],
            quarantineDurationSuffix: [this.formData.quarantineDurationSuffix],
            movementControl: [
                this.formData.movementControl,
                //  Validators.required,
            ],
            movementControlMeasures: [this.formData.movementControlMeasures],
            treatment: [this.formData.treatment, Validators.required],
            treatmentDetails: [this.formData.treatmentDetails],
            tests: [
                this.formData.diagnosticTests?.length
                    ? this.formData.tests
                    : [],
            ],
            medications: [
                this.formData.medications?.length
                    ? this.formData.medications
                    : [],
            ],
            vaccinations: [
                this.formData.vaccinations?.length
                    ? this.formData.vaccinations
                    : [],
            ],
        });
    }

    onSubmit() {
        this.submit.emit(this.reviewForm.value);
    }
}
