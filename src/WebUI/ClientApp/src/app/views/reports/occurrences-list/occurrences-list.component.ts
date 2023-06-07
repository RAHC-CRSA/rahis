import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { ReportsState } from 'app/modules/reports/store';
import { loadOccurrences } from 'app/modules/reports/store/actions';
import { getOccurrences } from 'app/modules/reports/store/selectors';
import { OccurrenceDto } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-occurrences-list',
    templateUrl: './occurrences-list.component.html',
    styleUrls: ['./occurrences-list.component.scss'],
})
export class OccurrencesListComponent {
    displayedColumns: string[] = [
        'id',
        'title',
        'location',
        'dateStarted',
        'dateEnded',
        'reports',
    ];
    dataSource: MatTableDataSource<OccurrenceDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    occurrences$: Observable<OccurrenceDto[] | null | undefined>;
    loading$: Observable<boolean>;

    constructor(private store: Store<ReportsState>) {}

    ngOnInit() {
        this.store.dispatch(loadOccurrences());
        this.occurrences$ = this.store.select(getOccurrences);
        this.occurrences$.subscribe((items) => {
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
