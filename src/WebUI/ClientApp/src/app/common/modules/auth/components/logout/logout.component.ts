import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../../store/actions/auth.actions';
import { AuthState } from '../../store/reducers';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private store: Store<AuthState>, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(logout());
    this.router.navigateByUrl('auth/login');
  }
}
