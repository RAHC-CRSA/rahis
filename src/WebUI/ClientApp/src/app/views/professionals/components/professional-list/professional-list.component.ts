import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ParaProfessionalDto } from 'src/app/web-api-client';
import {
  ParaProfessionalsState,
  getParaProfessionals,
} from '../../store/reducers';
import { Store } from '@ngrx/store';
import { loadParaProfessionals } from '../../store/actions/professionals.actions';

@Component({
  selector: 'app-professional-list',
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.scss'],
})
export class ProfessionalListComponent implements OnInit {
  professionals$: Observable<ParaProfessionalDto[] | null | undefined>;

  constructor(private store: Store<ParaProfessionalsState>) {}
  ngOnInit(): void {
    this.store.dispatch(loadParaProfessionals({ payload: undefined }));
    this.professionals$ = this.store.select(getParaProfessionals);
  }
}
