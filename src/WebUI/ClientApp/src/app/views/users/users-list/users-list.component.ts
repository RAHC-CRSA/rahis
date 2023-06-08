import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { UserState } from 'app/modules/users/store';
import { loadUsers } from 'app/modules/users/store/actions';
import { getUsers, getUsersLoading } from 'app/modules/users/store/selectors';
import { UserListDto } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
    displayedColumns: string[] = ['name', 'roles', 'email'];
    dataSource: MatTableDataSource<UserListDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    users$: Observable<UserListDto[] | null | undefined>;
    loading$: Observable<boolean>;

    constructor(private store: Store<UserState>) {}

    ngOnInit() {
        this.store.dispatch(loadUsers());
        this.users$ = this.store.select(getUsers);
        this.users$.subscribe((items) => {
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.loading$ = this.store.select(getUsersLoading);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
