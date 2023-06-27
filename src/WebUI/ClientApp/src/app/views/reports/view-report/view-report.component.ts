import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/core/auth/store';
import { getRoles } from 'app/core/auth/store/selectors';
import { ReportState } from 'app/modules/reports/store';
import { loadReport, verifyReport } from 'app/modules/reports/store/actions';
import {
    getFeedback,
    getReport,
    getReportsLoaded,
    getReportsLoading,
} from 'app/modules/reports/store/selectors';
import {
    IVerifyReportClient,
    IVerifyReportCommand,
    ReportDto,
    ServerResponse,
} from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-view-report',
    templateUrl: './view-report.component.html',
    styleUrls: ['./view-report.component.scss'],
})
export class ViewReportComponent implements OnInit {
    canVerify: boolean;
    reportId: number;
    report$: Observable<ReportDto | null | undefined>;
    feedback$: Observable<ServerResponse | null | undefined>;
    loading$: Observable<boolean>;
    loaded$: Observable<boolean>;

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
        this.authStore
            .select(getRoles)
            .subscribe(
                (roles) => (this.canVerify = roles.includes('Verifier'))
            );
        this.report$ = this.store.select(getReport);
        this.feedback$ = this.store.select(getFeedback);
        this.loading$ = this.store.select(getReportsLoading);
        this.loaded$ = this.store.select(getReportsLoaded);
    }

    verify() {
        const payload: IVerifyReportCommand = { id: this.reportId };
        this.store.dispatch(verifyReport({ payload }));
    }
}
