import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/core/auth/store';
import { getUser } from 'app/core/auth/store/selectors';
import { AuthResponseDto } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-super-admin',
    templateUrl: './super-admin.component.html',
    styleUrls: ['./super-admin.component.scss'],
})
export class SuperAdminComponent implements OnInit {
    user$: Observable<AuthResponseDto | null | undefined>;

    constructor(private store: Store<AuthState>) {}

    ngOnInit() {
        this.user$ = this.store.select(getUser);
    }
}
