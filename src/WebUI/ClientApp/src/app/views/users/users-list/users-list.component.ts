import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UserState } from 'app/modules/users/store';
import { deleteUser, loadUsers } from 'app/modules/users/store/actions';
import {
    getFeedback,
    getUsers,
    getUsersLoaded,
    getUsersLoading,
} from 'app/modules/users/store/selectors';
import {
    AuthResponseDto,
    IDeleteUserCommand,
    ServerResponse,
    UserListDto,
} from 'app/web-api-client';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'app/common/components/confirm-dialog/confirm-dialog.component';
import { AuthState } from 'app/core/auth/store';
import { getUser } from 'app/core/auth/store/selectors';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    animations: fuseAnimations,
})
export class UsersListComponent {
    displayedColumns: string[] = ['name', 'roles', 'email', 'actions'];
    dataSource: MatTableDataSource<UserListDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    user$: Observable<AuthResponseDto | null | undefined>;
    users$: Observable<UserListDto[] | null | undefined>;
    loading$: Observable<boolean>;
    loaded$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    constructor(
        private store: Store<UserState>,
        private authStore: Store<AuthState>,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.initData();
    }

    initData() {
        this.feedback$ = this.store.select(getFeedback);
        this.user$ = this.authStore.select(getUser);
        this.users$ = this.store.select(getUsers);
        this.users$.subscribe((items) => {
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.loading$ = this.store.select(getUsersLoading);
        this.loaded$ = this.store.select(getUsersLoaded);
        this.loaded$.subscribe((loaded) => {
            if (!loaded) {
                this.store.dispatch(loadUsers());
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

    onDelete(id: string) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (!!result) {
                const payload: IDeleteUserCommand = { id };
                this.store.dispatch(deleteUser({ payload }));
            }
        });
    }
}
