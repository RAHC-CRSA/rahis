import { Component } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/core/auth/store';
import { getUser } from 'app/core/auth/store/selectors';
import { AuthResponseDto } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-chief-veterinary-officer',
    templateUrl: './chief-veterinary-officer.component.html',
    styleUrls: ['./chief-veterinary-officer.component.scss'],
    animations: fuseAnimations,
})
export class ChiefVeterinaryOfficerComponent {
    user$: Observable<AuthResponseDto | null | undefined>;

    constructor(private store: Store<AuthState>) {}

    ngOnInit() {
        this.user$ = this.store.select(getUser);
    }
}
