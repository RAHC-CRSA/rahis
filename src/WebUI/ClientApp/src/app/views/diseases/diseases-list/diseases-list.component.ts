import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { ConfirmDialogComponent } from 'app/common/components/confirm-dialog/confirm-dialog.component';
import { DiseaseState } from 'app/modules/diseases/store';
import {
    deleteDisease,
    loadDiseases,
} from 'app/modules/diseases/store/actions';
import {
    getDiseases,
    getDiseasesLoaded,
    getDiseasesLoading,
    getFeedback,
} from 'app/modules/diseases/store/selectors';
import {
    DiseaseDto,
    IDeleteDiseaseCommand,
    ServerResponse,
} from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-diseases-list',
    templateUrl: './diseases-list.component.html',
    styleUrls: ['./diseases-list.component.scss'],
    animations: fuseAnimations,
})
export class DiseasesListComponent {
    displayedColumns: string[] = [
        'id',
        'name',
        'code',
        'classification',
        'zoonotic',
        'actions',
    ];
    dataSource: MatTableDataSource<DiseaseDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    diseases$: Observable<DiseaseDto[] | null | undefined>;
    loading$: Observable<boolean>;
    loaded$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    constructor(
        private store: Store<DiseaseState>,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.diseases$ = this.store.select(getDiseases);
        this.diseases$.subscribe((items) => {
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.feedback$ = this.store.select(getFeedback);
        this.loading$ = this.store.select(getDiseasesLoading);
        this.loaded$ = this.store.select(getDiseasesLoaded);
        this.loaded$.subscribe((loaded) => {
            if (!loaded) {
                this.store.dispatch(loadDiseases());
            }
        });
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
                const payload: IDeleteDiseaseCommand = { id };
                this.store.dispatch(deleteDisease({ payload }));
            }
        });
    }
}
