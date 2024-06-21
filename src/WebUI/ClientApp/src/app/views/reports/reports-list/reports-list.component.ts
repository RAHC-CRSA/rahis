import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { ConfirmDialogComponent } from 'app/common/components/confirm-dialog/confirm-dialog.component';
import { AuthState } from 'app/core/auth/store';
import { getRoles, getUser } from 'app/core/auth/store/selectors';
import { ReportState } from 'app/modules/reports/store';
import { deleteReport, loadReports } from 'app/modules/reports/store/actions';
import {
    getFeedback,
    getRejectedReports,
    getReports,
    getReportsLoaded,
    getReportsLoading,
    getUnverifiedReports,
} from 'app/modules/reports/store/selectors';
import {
    IDeleteReportCommand,
    ReportListDto,
    ReportStatus,
    ServerResponse,
} from 'app/web-api-client';
import { Observable } from 'rxjs';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
    selector: 'app-reports-list',
    templateUrl: './reports-list.component.html',
    styleUrls: ['./reports-list.component.scss'],
    animations: fuseAnimations,
})
export class ReportsListComponent {
    displayedColumns: string[] = [
        'id',
        'occurrenceTitle',
        'location',
        'isVerified',
        'reportStatus',
        'exposed',
        'infected',
        'mortality',
        'updated',
        'actions',
    ];
    dataSource: MatTableDataSource<ReportListDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    roles: string[];
    canCreateReport: boolean;
    canCommentOnReport: boolean;
    canDeleteReport: boolean;
    queryPayload: any;
    reports: ReportListDto[];
    reports$: Observable<ReportListDto[] | null | undefined>;
    loading$: Observable<boolean>;
    loaded$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;
    ReportStatus: ReportStatus;

    constructor(
        private store: Store<ReportState>,
        private authStore: Store<AuthState>,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.initData();
    }

    initData() {
        this.authStore.select(getUser).subscribe((user) => {
            if (user) {
                this.roles = user.roles;
                this.canCreateReport =
                    this.roles.includes('Admim') ||
                    this.roles.includes('Super Admin') ||
                    this.roles.includes('Reporter');

                this.canCommentOnReport =
                    this.roles.includes('Chief Veterinary Officer') ||
                    this.roles.includes('Regional Animal Health Officer');

                this.canDeleteReport =
                    this.roles.includes('Admim') ||
                    this.roles.includes('Super Admin');

                let verified: boolean | null | undefined = undefined;
                // if (user.roles.includes('Chief Veterinary Officer'))
                //     verified = false;
                // else if (user.roles.includes('Regional Animal Health Officer'))
                //     verified = true;

                this.queryPayload = {
                    isVerified: verified,
                    fromMonths: undefined,
                    countryId: user.countryId,
                    userId: user.roles.includes('Reporter')
                        ? user.appUserId
                        : undefined,
                };

                this.store.dispatch(
                    loadReports({ payload: this.queryPayload })
                );
                this.reports$ = this.store.select(getReports);
                this.reports$ = user.roles.includes('Reporter')
                    ? this.store.select(getRejectedReports)
                    : user.roles.includes('Chief Veterinary Officer')
                    ? this.store.select(getUnverifiedReports)
                    : this.store.select(getReports);
                // this.reports$ = user.roles.includes('Chief Veterinary Officer')
                //     ? this.store.select(getUnverifiedReports)
                //     : this.store.select(getReports);
            }
        });
        this.reports$.subscribe((items) => {
            this.reports = items;
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.feedback$ = this.store.select(getFeedback);
        this.loading$ = this.store.select(getReportsLoading);
        this.loaded$ = this.store.select(getReportsLoaded);
    }

    exportExcel() {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet('Monthly Report');

        worksheet.columns = [
            { header: 'Id', key: 'id', width: 10 },
            { header: 'Occurrence Title', key: 'occurrenceTitle', width: 32 },
            { header: 'Location', key: 'location', width: 10 },
            { header: 'Report Status', key: 'reportStatus', width: 10 },
            { header: 'Verified', key: 'isVerified', width: 10 },
            { header: 'Number Exposed', key: 'exposed', width: 10 },
            { header: 'Number Infected', key: 'infected', width: 10 },
            { header: 'Mortality', key: 'mortality', width: 10 },
        ];

        this.reports.forEach((e) => {
            worksheet.addRow(
                {
                    id: e.id,
                    occurrenceTitle: e.occurrenceTitle,
                    location: e.location,
                    reportStatus: this.getReportStatus(e.reportStatus),
                    isVerified: e.isVerified ? 'Yes' : 'No',
                    exposed: e.exposed,
                    infected: e.infected,
                    mortality: e.mortality,
                },
                'n'
            );
        });

        workbook.xlsx.writeBuffer().then((data) => {
            let blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            fs.saveAs(blob, 'RAHIS_Report.xlsx');
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    getReportStatus(statusInt: number): string {
        let status = '';
        switch (statusInt) {
            case 0:
                status = 'Pending';
                break;
            case 1:
                status = 'Validated';
                break;
            case 2:
                status = 'Rejected';
                break;
            default:
                break;
        }

        return status;
    }

    onDelete(id: number) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (!!result) {
                const payload: IDeleteReportCommand = { id };
                this.store.dispatch(deleteReport({ payload }));
            }
        });
    }
}
