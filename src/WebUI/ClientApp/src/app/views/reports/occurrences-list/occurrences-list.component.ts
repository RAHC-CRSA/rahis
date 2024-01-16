import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { ConfirmDialogComponent } from 'app/common/components/confirm-dialog/confirm-dialog.component';
import { AuthState } from 'app/core/auth/store';
import { getUser } from 'app/core/auth/store/selectors';
import { ReportState } from 'app/modules/reports/store';
import {
    deleteOccurrence,
    loadOccurrences,
} from 'app/modules/reports/store/actions';
import {
    getFeedback,
    getOccurrences,
    getReportsLoaded,
    getReportsLoading,
} from 'app/modules/reports/store/selectors';
import {
    IDeleteOccurrenceCommand,
    IGetOccurrencesQuery,
    OccurrenceDto,
    ServerResponse,
} from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-occurrences-list',
    templateUrl: './occurrences-list.component.html',
    styleUrls: ['./occurrences-list.component.scss'],
    animations: fuseAnimations,
})
export class OccurrencesListComponent {
    displayedColumns: string[] = [
        'id',
        'title',
        'location',
        'dateStarted',
        'dateEnded',
        'reports',
        'actions',
    ];
    dataSource: MatTableDataSource<OccurrenceDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    occurrences$: Observable<OccurrenceDto[] | null | undefined>;
    loading$: Observable<boolean>;
    loaded$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    constructor(
        private authStore: Store<AuthState>,
        private store: Store<ReportState>,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.initData();
    }

    initData() {
        this.authStore.select(getUser).subscribe((user) => {
            if (user) {
                let countryId: number | undefined = undefined;
                if (
                    user.roles?.includes('Admin') ||
                    user.roles?.includes('Super Admin')
                ) {
                    countryId = user.countryId;
                }

                const payload: IGetOccurrencesQuery = {
                    countryId,
                };

                this.store.dispatch(loadOccurrences({ payload }));
            }
        });

        this.occurrences$ = this.store.select(getOccurrences);
        this.occurrences$.subscribe((items) => {
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

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
                const payload: IDeleteOccurrenceCommand = { id };
                this.store.dispatch(deleteOccurrence({ payload }));
            }
        });
    }
}
