import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { InstitutionsState } from 'app/modules/institutions/store';
import {
    getFeedback,
    getInstitutions,
    getInstitutionsLoaded,
    getInstitutionsLoading,
} from 'app/modules/institutions/store/selectors';
import {
    deleteInstitution,
    loadInstitutions,
} from 'app/modules/institutions/store/actions';
import {
    IDeleteInstitutionCommand,
    InstitutionDto,
    ServerResponse,
} from 'app/web-api-client';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'app/common/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-institutions-list',
    templateUrl: './institutions-list.component.html',
    styleUrls: ['./institutions-list.component.scss'],
    animations: fuseAnimations,
})
export class InstitutionsListComponent {
    displayedColumns: string[] = [
        'id',
        'name',
        'type',
        'publicSector',
        'actions',
    ];
    dataSource: MatTableDataSource<InstitutionDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    institutions$: Observable<InstitutionDto[] | null | undefined>;
    loading$: Observable<boolean>;
    loaded$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    constructor(
        private store: Store<InstitutionsState>,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.store.dispatch(loadInstitutions());
        this.institutions$ = this.store.select(getInstitutions);
        this.institutions$.subscribe((items) => {
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.feedback$ = this.store.select(getFeedback);
        this.loading$ = this.store.select(getInstitutionsLoading);
        this.loaded$ = this.store.select(getInstitutionsLoaded);
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
                const payload: IDeleteInstitutionCommand = { id };
                this.store.dispatch(deleteInstitution({ payload }));
            }
        });
    }
}
