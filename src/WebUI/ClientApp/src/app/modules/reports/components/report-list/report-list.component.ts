import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportListDto } from '../../../../web-api-client';
import { loadReports } from '../../store/actions';
import { getReports, ReportState } from '../../store/reducers';

@Component({
    selector: 'app-report-list',
    templateUrl: './report-list.component.html',
    styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent implements OnInit {
    displayedColumns: string[] = [
        'id',
        'occurrence',
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

    constructor(private store: Store<ReportState>) {}

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
