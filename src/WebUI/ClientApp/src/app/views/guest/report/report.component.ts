import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/core/auth/store';
import { ReportState } from 'app/modules/reports/store';
import { loadPublicReports } from 'app/modules/reports/store/actions';
import { getPublicReports } from 'app/modules/reports/store/selectors';
import { ReportListDto, ServerResponse } from 'app/web-api-client';
import { Observable } from 'rxjs';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
    displayedColumns: string[] = [
        'id',
        'occurrenceTitle',
        'location',
        'isVerified',
        'exposed',
        'infected',
        'mortality',
        'created',
    ];

    dataSource: MatTableDataSource<ReportListDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    reports: ReportListDto[];
    reports$: Observable<ReportListDto[] | null | undefined>;
    loading$: Observable<boolean>;
    loaded$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    constructor(
        private store: Store<ReportState>,
        private authStore: Store<AuthState>
    ) {}

    ngOnInit() {
        this.initData();
    }

    initData() {
        this.store.dispatch(loadPublicReports({ payload: undefined }));

        this.reports$ = this.store.select(getPublicReports);
        this.reports$.subscribe((items) => {
            this.reports = items;
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    exportExcel() {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet('Monthly Report');

        worksheet.columns = [
            { header: 'Id', key: 'id', width: 10 },
            { header: 'Occurrence Title', key: 'occurrenceTitle', width: 32 },
            { header: 'Location', key: 'location', width: 10 },
            { header: 'Verified', key: 'isVerified', width: 10 },
            { header: 'Number Exposed', key: 'exposed', width: 10 },
            { header: 'Number Infected', key: 'infected', width: 10 },
        ];

        this.reports.forEach((e) => {
            worksheet.addRow(
                {
                    id: e.id,
                    occurrenceTitle: e.occurrenceTitle,
                    location: e.location,
                    isVerified: e.isVerified,
                    exposed: e.exposed,
                    infected: e.infected,
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
}
