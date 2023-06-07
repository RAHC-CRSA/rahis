import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { InstitutionsState } from 'app/modules/institutions/store';
import {
    getInstitutions,
    getInstitutionsLoading,
} from 'app/modules/institutions/store/selectors';
import { loadInstitutions } from 'app/modules/institutions/store/actions';
import { InstitutionDto } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-institutions-list',
    templateUrl: './institutions-list.component.html',
    styleUrls: ['./institutions-list.component.scss'],
})
export class InstitutionsListComponent {
    displayedColumns: string[] = ['id', 'name', 'type', 'publicSector'];
    dataSource: MatTableDataSource<InstitutionDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    institutions$: Observable<InstitutionDto[] | null | undefined>;
    loading$: Observable<boolean>;

    constructor(private store: Store<InstitutionsState>) {}

    ngOnInit() {
        this.store.dispatch(loadInstitutions());
        this.institutions$ = this.store.select(getInstitutions);
        this.institutions$.subscribe((items) => {
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.loading$ = this.store.select(getInstitutionsLoading);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
