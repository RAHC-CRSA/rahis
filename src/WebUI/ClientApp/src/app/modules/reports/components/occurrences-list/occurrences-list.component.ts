import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OccurrenceDto } from '../../../../web-api-client';
import { loadOccurrences } from '../../store/actions';
import { getOccurrences, ReportState } from '../../store/reducers';

@Component({
    selector: 'app-occurrences-list',
    templateUrl: './occurrences-list.component.html',
    styleUrls: ['./occurrences-list.component.scss'],
})
export class OccurrencesListComponent implements OnInit {
    occurrences$: Observable<OccurrenceDto[] | null | undefined>;

    constructor(private store: Store<ReportState>) {}

    ngOnInit() {
        this.store.dispatch(loadOccurrences());
        this.occurrences$ = this.store.select(getOccurrences);
    }
}
