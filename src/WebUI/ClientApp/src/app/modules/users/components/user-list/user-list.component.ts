import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUserListDto } from 'src/app/web-api-client';
import { loadUsers } from '../../store/actions';
import { getUsers, UserState } from '../../store/reducers';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  users$: Observable<IUserListDto[] | null | undefined>;

  constructor(private store: Store<UserState>) {}

  ngOnInit() {
    this.store.dispatch(loadUsers());
    this.users$ = this.store.select(getUsers);
  }
}
