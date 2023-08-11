import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import {
    getFeedback,
    getRecipients,
    getRecipientsLoading,
    getRecipientsLoaded,
} from 'app/modules/notification-recipients/store/selectors';
import {
    deleteNotificationRecipient,
    loadNotificationRecipients,
} from 'app/modules/notification-recipients/store/actions';
import {
    IDeleteRecipientCommand,
    NotificationRecipientDto,
    ServerResponse,
} from 'app/web-api-client';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'app/common/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { NotificationRecipientsState } from 'app/modules/notification-recipients/store';

@Component({
    selector: 'app-notification-recipients-list',
    templateUrl: './notification-recipients-list.component.html',
    styleUrls: ['./notification-recipients-list.component.scss'],
    animations: fuseAnimations,
})
export class NotificationRecipientsListComponent {
    displayedColumns: string[] = [
        'id',
        'name',
        'institution',
        'enabled',
        'actions',
    ];
    dataSource: MatTableDataSource<NotificationRecipientDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    recipients$: Observable<NotificationRecipientDto[] | null | undefined>;
    loading$: Observable<boolean>;
    loaded$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    constructor(
        private store: Store<NotificationRecipientsState>,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.store.dispatch(loadNotificationRecipients());
        this.recipients$ = this.store.select(getRecipients);
        this.recipients$.subscribe((items) => {
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.feedback$ = this.store.select(getFeedback);
        this.loading$ = this.store.select(getRecipientsLoading);
        this.loaded$ = this.store.select(getRecipientsLoaded);
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
                const payload: IDeleteRecipientCommand = { id };
                this.store.dispatch(deleteNotificationRecipient({ payload }));
            }
        });
    }
}
