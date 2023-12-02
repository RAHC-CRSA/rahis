import { Component, OnInit } from '@angular/core';
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
    canVerify: boolean;
    canNotify: boolean;
    reportId: number;
    cvoComment: string;
    reportStatus: ReportStatus;
    report$: Observable<ReportDto | null | undefined>;
    feedback$: Observable<ServerResponse | null | undefined>;
    loading$: Observable<boolean>;
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
        'humansInfected',
        'humanMortality',
    ];

    constructor(
        private store: Store<ReportState>,
        private authStore: Store<AuthState>,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.reportId = +params.get('id');
        });
        this.initData();
    }

    initData() {
        this.store.dispatch(loadReport({ payload: this.reportId }));
        this.authStore.select(getRoles).subscribe((roles) => {
            if (roles) {
                this.canVerify = roles.includes('Chief Veterinary Officer');
                this.canNotify = roles.includes(
                    'Regional Animal Health Officer'
                );
            }
        });
        this.report$ = this.store.select(getReport);
        this.feedback$ = this.store.select(getFeedback);
        this.loading$ = this.store.select(getReportsLoading);
        this.loaded$ = this.store.select(getReportsLoaded);

        this.report$.subscribe((data) => {
            if (data) {
                console.log({ data });
                this.reportInfoData$ = of([
                    {
                        animalsExposed: data.exposed ?? 0,
                        animalsInfected: data.infected ?? 0,
                        animalMortality: data.mortality ?? 0,
                        humansExposed: data.humansExposed ?? 0,
                        humansInfected: data.humansInfected ?? 0,
                        humanMortality: data.humansMortality ?? 0,
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

    verify() {

    }

    submit() {
        const payload: IVerifyReportCommand = { id: this.reportId, cvoComment: "GUY WHY?", reportStatus: ReportStatus.Rejected };
        this.store.dispatch(verifyReport({ payload }));
    }

    sendNotification() {
        const payload: ISendNotificationCommand = { reportId: this.reportId };
        this.store.dispatch(sendNotification({ payload }));
    }
}
