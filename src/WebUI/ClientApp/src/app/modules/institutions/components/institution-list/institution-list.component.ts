import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InstitutionDto } from 'src/app/web-api-client';
import { InstitutionsState, getInstitutions } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { loadInstitutions } from '../../store/actions';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss'],
})
export class InstitutionListComponent implements OnInit {
  institutions$: Observable<InstitutionDto[] | null | undefined>;

  constructor(private store: Store<InstitutionsState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadInstitutions());
    this.institutions$ = this.store.select(getInstitutions);
  }
}
