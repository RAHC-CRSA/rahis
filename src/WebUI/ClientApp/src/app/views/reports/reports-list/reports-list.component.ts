import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { ConfirmDialogComponent } from 'app/common/components/confirm-dialog/confirm-dialog.component';
import { getRoles } from 'app/core/auth/store/selectors';
import { ReportState } from 'app/modules/reports/store';
import { deleteReport, loadReports } from 'app/modules/reports/store/actions';
import {
    getFeedback,
    getReports,
    getReportsLoaded,
    getReportsLoading,
} from 'app/modules/reports/store/selectors';
import {
    IDeleteReportCommand,
    ReportListDto,
    ServerResponse,
} from 'app/web-api-client';
import { Observable } from 'rxjs';

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
        'exposed',
        'infected',
        'mortality',
        'created',
        'actions',
    ];
    dataSource: MatTableDataSource<ReportListDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    roles: string[];
    reports$: Observable<ReportListDto[] | null | undefined>;
    loading$: Observable<boolean>;
    loaded$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    constructor(private store: Store<ReportState>, private dialog: MatDialog) {}

    ngOnInit() {
        this.initData();
    }

    initData() {
        this.store.dispatch(loadReports());
        this.reports$ = this.store.select(getReports);
        this.reports$.subscribe((items) => {
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.store.select(getRoles).subscribe((roles) => (this.roles = roles));
        this.feedback$ = this.store.select(getFeedback);
        this.loading$ = this.store.select(getReportsLoading);
        this.loaded$ = this.store.select(getReportsLoaded);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
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
