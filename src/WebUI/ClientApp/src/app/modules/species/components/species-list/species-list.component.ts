import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadSpecies } from '../../store/actions/species.actions';
import { getSpecies } from '../../store/reducers';
import { SpeciesState } from '../../store/reducers';
import { SpeciesModel as Species } from 'src/app/models';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.scss'],
})
export class SpeciesListComponent implements OnInit {
  species$: Observable<Species[]> | undefined;

  constructor(private store: Store<SpeciesState>) {}

  ngOnInit() {
    this.store.dispatch(loadSpecies());
    this.species$ = this.store.select(getSpecies);
  }
}
