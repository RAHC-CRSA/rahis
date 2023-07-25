import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { ConfirmDialogComponent } from 'app/common/components/confirm-dialog/confirm-dialog.component';
import { SpeciesState } from 'app/modules/species/store';
import { deleteSpecies, loadSpecies } from 'app/modules/species/store/actions';
import {
    getFeedback,
    getSpecies,
    getSpeciesLoaded,
    getSpeciesLoading,
} from 'app/modules/species/store/selectors';
import {
    IDeleteSpeciesCommand,
    ServerResponse,
    SpeciesDto,
} from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-species-list',
    templateUrl: './species-list.component.html',
    styleUrls: ['./species-list.component.scss'],
    animations: fuseAnimations,
})
export class SpeciesListComponent {
    displayedColumns: string[] = ['id', 'name'];
    dataSource: MatTableDataSource<SpeciesDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    species$: Observable<SpeciesDto[] | null | undefined>;
    loading$: Observable<boolean>;
    loaded$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    constructor(
        private store: Store<SpeciesState>,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.initData();
    }

    initData() {
        this.store.dispatch(loadSpecies());
        this.species$ = this.store.select(getSpecies);
        this.species$.subscribe((items) => {
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.feedback$ = this.store.select(getFeedback);
        this.loading$ = this.store.select(getSpeciesLoading);
        this.loaded$ = this.store.select(getSpeciesLoaded);
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
                const payload: IDeleteSpeciesCommand = { id };
                this.store.dispatch(deleteSpecies({ payload }));
            }
        });
    }
}
