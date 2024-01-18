import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/core/auth/store';
import { getRoles } from 'app/core/auth/store/selectors';
import { ReportState } from 'app/modules/reports/store';
import {
    loadReport,
    sendNotification,
    verifyReport,
} from 'app/modules/reports/store/actions';
import {
    getFeedback,
    getReport,
    getReportsLoaded,
    getReportsLoading,
} from 'app/modules/reports/store/selectors';
import {
    ISendNotificationCommand,
    IVerifyReportClient,
    IVerifyReportCommand,
    ReportDto,
    ReportStatus,
    ServerResponse,
} from 'app/web-api-client';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-view-report',
    templateUrl: './view-report.component.html',
    styleUrls: ['./view-report.component.scss'],
})
export class ViewReportComponent implements OnInit {
    verificationForm: FormGroup;
    loading$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    canVerify: boolean;
    canNotify: boolean;
    canEdit: boolean;
    reportId: number;
    cvoComment: string;

    reportStatus: ReportStatus;
    report$: Observable<ReportDto | null | undefined>;
    loaded$: Observable<boolean>;
    reportInfoData$: Observable<any[] | null | undefined>;
    actionsInfoData$: Observable<any[] | null | undefined>;

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
        private authStore: Store<AuthState>,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.reportId = +params.get('id');
        });
        this.initData();
        this.initForm();
    }

    initData() {
        this.canVerify = false;
        this.canNotify = false;
        this.store.dispatch(loadReport({ payload: this.reportId }));
        this.authStore.select(getRoles).subscribe((roles) => {
            if (roles) {
                this.canNotify = roles.includes('Chief Veterinary Officer');
                this.canVerify = roles.includes(
                    'Regional Animal Health Officer'
                );
                this.canEdit = roles.includes('Reporter');
            }
        });
        this.report$ = this.store.select(getReport);
        this.feedback$ = this.store.select(getFeedback);
        this.loading$ = this.store.select(getReportsLoading);
        this.loaded$ = this.store.select(getReportsLoaded);

        this.report$.subscribe((data) => {
            if (data) {
                console.log({ data });
                this.cvoComment = data.cvoComment;
                this.reportInfoData$ = of([
                    {
                        animalsExposed: data.exposed ?? 0,
                        animalsInfected: data.infected ?? 0,
                        animalMortality: data.mortality ?? 0,
                        humansExposed: data.humansExposed ?? 0,
                    },
                ]);

                this.actionsInfoData$ = of([
                    {
                        stampingOut: data.stampingOut,
                        destructionOfCorpses: data.destructionOfCorpses,
                        disinfection: data.disinfection,
                        quarantine: data.quarantine,
                        movementControl: data.movementControl,
                        observation: data.observation,
                    },
                ]);
            }
        });
    }

    initForm() {
        this.verificationForm = this.formBuilder.group({
            cvoComment: [this.cvoComment],
        });
    }

    get f() {
        return this.verificationForm?.controls;
    }

    reject() {
        const payload: IVerifyReportCommand = {
            id: this.reportId,
            cvoComment: this.f.cvoComment.value,
            isVerified: false,
            reportStatus: ReportStatus.Rejected,
        };
        console.log('cvo comment is ', this.f.cvoComment.value);
        this.store.dispatch(verifyReport({ payload }));
    }

    validate() {
        const payload: IVerifyReportCommand = {
            id: this.reportId,
            isVerified: true,
            reportStatus: ReportStatus.Approved,
        };
        this.store.dispatch(verifyReport({ payload }));
    }

    sendNotification() {
        const payload: ISendNotificationCommand = { reportId: this.reportId };
        this.store.dispatch(sendNotification({ payload }));
    }
}
