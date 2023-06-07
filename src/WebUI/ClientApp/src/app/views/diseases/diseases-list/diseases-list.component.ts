import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { DiseaseState } from 'app/modules/diseases/store';
import { loadDiseases } from 'app/modules/diseases/store/actions';
import {
    getDiseases,
    getDiseasesLoading,
} from 'app/modules/diseases/store/selectors';
import { DiseaseDto } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-diseases-list',
    templateUrl: './diseases-list.component.html',
    styleUrls: ['./diseases-list.component.scss'],
})
export class DiseasesListComponent {
    displayedColumns: string[] = [
        'id',
        'name',
        'code',
        'classification',
        'zoonotic',
    ];
    dataSource: MatTableDataSource<DiseaseDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    diseases$: Observable<DiseaseDto[] | null | undefined>;
    loading$: Observable<boolean>;

    constructor(private store: Store<DiseaseState>) {}

    ngOnInit() {
        this.store.dispatch(loadDiseases());
        this.diseases$ = this.store.select(getDiseases);
        this.diseases$.subscribe((items) => {
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.loading$ = this.store.select(getDiseasesLoading);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
