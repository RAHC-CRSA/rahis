import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { ConfirmDialogComponent } from 'app/common/components/confirm-dialog/confirm-dialog.component';
import { RegionsState } from 'app/modules/regions/store';
import { deleteRegion, loadRegions } from 'app/modules/regions/store/actions';
import {
    getFeedback,
    getRegions,
    getRegionsLoaded,
    getRegionsLoading,
} from 'app/modules/regions/store/selectors/regions.selectors';
import {
    IDeleteRegionCommand,
    RegionDto,
    ServerResponse,
} from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-regions-list',
    templateUrl: './regions-list.component.html',
    styleUrls: ['./regions-list.component.scss'],
    animations: fuseAnimations,
})
export class RegionsListComponent {
    displayedColumns: string[] = ['id', 'name', 'country'];
    dataSource: MatTableDataSource<RegionDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    regions$: Observable<RegionDto[] | null | undefined>;
    loading$: Observable<boolean>;
    loaded$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    constructor(
        private store: Store<RegionsState>,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.store.dispatch(loadRegions({ payload: undefined }));
        this.regions$ = this.store.select(getRegions);
        this.regions$.subscribe((items) => {
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.feedback$ = this.store.select(getFeedback);
        this.loading$ = this.store.select(getRegionsLoading);
        this.loaded$ = this.store.select(getRegionsLoaded);
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
                const payload: IDeleteRegionCommand = { id };
                this.store.dispatch(deleteRegion({ payload }));
            }
        });
    }
}
