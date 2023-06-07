import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { SpeciesState } from 'app/modules/species/store';
import { loadSpecies } from 'app/modules/species/store/actions';
import {
    getSpecies,
    getSpeciesLoading,
} from 'app/modules/species/store/selectors';
import { SpeciesDto } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-species-list',
    templateUrl: './species-list.component.html',
    styleUrls: ['./species-list.component.scss'],
})
export class SpeciesListComponent {
    displayedColumns: string[] = ['id', 'name'];
    dataSource: MatTableDataSource<SpeciesDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    species$: Observable<SpeciesDto[] | null | undefined>;
    loading$: Observable<boolean>;

    constructor(private store: Store<SpeciesState>) {}

    ngOnInit() {
        this.store.dispatch(loadSpecies());
        this.species$ = this.store.select(getSpecies);
        this.species$.subscribe((items) => {
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.loading$ = this.store.select(getSpeciesLoading);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
