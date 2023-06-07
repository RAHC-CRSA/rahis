import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { ReportsState } from 'app/modules/reports/store';
import { loadReports } from 'app/modules/reports/store/actions';
import { getReports } from 'app/modules/reports/store/selectors';
import { ReportListDto } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-reports-list',
    templateUrl: './reports-list.component.html',
    styleUrls: ['./reports-list.component.scss'],
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
    ];
    dataSource: MatTableDataSource<ReportListDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    reports$: Observable<ReportListDto[] | null | undefined>;
    loading$: Observable<boolean>;

    constructor(private store: Store<ReportsState>) {}

    ngOnInit() {
        this.store.dispatch(loadReports());
        this.reports$ = this.store.select(getReports);
        this.reports$.subscribe((items) => {
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
