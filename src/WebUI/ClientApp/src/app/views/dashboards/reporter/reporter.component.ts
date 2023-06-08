import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/core/auth/store';
import { getUser } from 'app/core/auth/store/selectors';
import { AuthResponseDto } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-reporter',
    templateUrl: './reporter.component.html',
    styleUrls: ['./reporter.component.scss'],
})
export class ReporterComponent {
    user$: Observable<AuthResponseDto | null | undefined>;

    constructor(private store: Store<AuthState>) {}

    ngOnInit() {
        this.user$ = this.store.select(getUser);
    }
}
