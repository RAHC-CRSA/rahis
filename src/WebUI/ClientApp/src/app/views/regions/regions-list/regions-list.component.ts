import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { RegionsState } from 'app/modules/regions/store';
import { loadRegions } from 'app/modules/regions/store/actions';
import {
    getRegions,
    getRegionsLoading,
} from 'app/modules/regions/store/selectors/regions.selectors';
import { RegionDto } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-regions-list',
    templateUrl: './regions-list.component.html',
    styleUrls: ['./regions-list.component.scss'],
})
export class RegionsListComponent {
    displayedColumns: string[] = ['id', 'name', 'country'];
    dataSource: MatTableDataSource<RegionDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    regions$: Observable<RegionDto[] | null | undefined>;
    loading$: Observable<boolean>;

    constructor(private store: Store<RegionsState>) {}

    ngOnInit() {
        this.store.dispatch(loadRegions({ payload: undefined }));
        this.regions$ = this.store.select(getRegions);
        this.regions$.subscribe((items) => {
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.loading$ = this.store.select(getRegionsLoading);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
