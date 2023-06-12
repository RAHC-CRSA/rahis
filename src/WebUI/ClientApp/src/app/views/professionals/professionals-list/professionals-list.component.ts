import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { ConfirmDialogComponent } from 'app/common/components/confirm-dialog/confirm-dialog.component';
import { ParaProfessionalsState } from 'app/modules/professionals/store';
import {
    deleteParaProfessional,
    loadParaProfessionals,
} from 'app/modules/professionals/store/actions';
import {
    getFeedback,
    getParaProfessionals,
    getParaProfessionalsLoaded,
    getParaProfessionalsLoading,
} from 'app/modules/professionals/store/selectors';
import {
    IDeleteParaProfessionalCommand,
    ParaProfessionalDto,
    ServerResponse,
} from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-professionals-list',
    templateUrl: './professionals-list.component.html',
    styleUrls: ['./professionals-list.component.scss'],
    animations: fuseAnimations,
})
export class ProfessionalsListComponent {
    displayedColumns: string[] = [
        'id',
        'name',
        'position',
        'institutionName',
        'phone',
        'email',
        'actions',
    ];
    dataSource: MatTableDataSource<ParaProfessionalDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    professionals$: Observable<ParaProfessionalDto[] | null | undefined>;
    loading$: Observable<boolean>;
    loaded$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    constructor(
        private store: Store<ParaProfessionalsState>,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.store.dispatch(loadParaProfessionals({ payload: undefined }));
        this.professionals$ = this.store.select(getParaProfessionals);
        this.professionals$.subscribe((items) => {
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.feedback$ = this.store.select(getFeedback);
        this.loading$ = this.store.select(getParaProfessionalsLoading);
        this.loaded$ = this.store.select(getParaProfessionalsLoaded);
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
                const payload: IDeleteParaProfessionalCommand = { id };
                this.store.dispatch(deleteParaProfessional({ payload }));
            }
        });
    }
}
