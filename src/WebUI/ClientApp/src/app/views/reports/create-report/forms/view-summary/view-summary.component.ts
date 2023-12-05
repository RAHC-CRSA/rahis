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
import { observeProperty$ } from 'app/common/helpers/observable-property';
import { ReportState } from 'app/modules/reports/store';
import {
    addParaProfessional,
    loadParaProfessionals,
} from 'app/modules/reports/store/actions';
import { getParaProfessionals } from 'app/modules/reports/store/selectors';
import {
    IAddParaProfessionalCommand,
    ParaProfessionalDto,
} from 'app/web-api-client';
import { Observable, of, map, startWith } from 'rxjs';

@Component({
    selector: 'app-report-summary',
    templateUrl: './view-summary.component.html',
    styleUrls: ['./view-summary.component.scss'],
    animations: fuseAnimations,
})
export class ViewSummaryComponent implements OnInit {
    @Input() formData: any;
    report: any;

    reportInfoData: any;
    actionsInfoData: any;

    @Output() previous = new EventEmitter();
    @Output() submit = new EventEmitter();

    @Input()loading: boolean;
    // and here you convert the input to an observable one
    loading$ = observeProperty$(this, "loading");

    diagnosticTestColumns: string[] = [
        'id',
        'testName',
        'numberTested',
        'numberPositive',
        // 'numberNegative',
        // 'numberUndetermined',
        'professionalName',
    ];

    medicationColumns: string[] = ['id', 'name', 'dosage'];

    vaccinationColumns: string[] = [
        'id',
        'vaccineName',
        'numberVaccinated',
        'humansVaccinated',
        'animalsVaccinated',
        'professionalName',
    ];

    actionsInfoColumns: string[] = [
        'stampingOut',
        'destructionOfCorpses',
        'disinfection',
        'quarantine',
        'movementControl',
        'observation',
    ];

    reportInfoColumns: string[] = [
        'animalsExposed',
        'animalsInfected',
        'animalMortality',
        'humansExposed',
    ];

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<ReportState>,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.initData();
    }

    initData() {
        console.log({ ...this.formData });
        this.report = this.formData;
        const data = this.formData;

        if (data) {
            this.reportInfoData=
                {
                    animalsExposed: data.exposed ?? 0,
                    animalsInfected: data.infected ?? 0,
                    animalMortality: data.mortality ?? 0,
                    humansExposed: data.humansExposed ?? 0,
                };

            this.actionsInfoData =
                {
                    stampingOut: data.stampingOut,
                    destructionOfCorpses: data.destructionOfCorpses,
                    disinfection: data.disinfection,
                    quarantine: data.quarantine,
                    movementControl: data.movementControl,
                    observation: data.observation,
                };
        }

    }


    displayProfessionalFn(professional: ParaProfessionalDto): string {
        return professional ? professional.name : '';
    }

    onPrevious() {
        this.previous.emit();
    }

    onSubmit() {
        this.submit.emit(this.report);
    }
}
