import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { ParaProfessionalsState } from 'app/modules/professionals/store';
import { loadParaProfessionals } from 'app/modules/professionals/store/actions';
import {
    getParaProfessionals,
    getParaProfessionalsLoading,
} from 'app/modules/professionals/store/selectors';
import { ParaProfessionalDto } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-professionals-list',
    templateUrl: './professionals-list.component.html',
    styleUrls: ['./professionals-list.component.scss'],
})
export class ProfessionalsListComponent {
    displayedColumns: string[] = [
        'id',
        'name',
        'position',
        'institutionName',
        'phone',
        'email',
    ];
    dataSource: MatTableDataSource<ParaProfessionalDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    professionals$: Observable<ParaProfessionalDto[] | null | undefined>;
    loading$: Observable<boolean>;

    constructor(private store: Store<ParaProfessionalsState>) {}

    ngOnInit() {
        this.store.dispatch(loadParaProfessionals({ payload: undefined }));
        this.professionals$ = this.store.select(getParaProfessionals);
        this.professionals$.subscribe((items) => {
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.loading$ = this.store.select(getParaProfessionalsLoading);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
