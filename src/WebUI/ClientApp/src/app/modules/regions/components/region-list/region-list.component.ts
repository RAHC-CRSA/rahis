import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { RegionDto } from 'src/app/web-api-client';
import { loadRegions } from '../../store/actions';
import { getRegions, RegionsState } from '../../store/reducers';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss'],
})
export class RegionListComponent implements OnInit {
  regions$: Observable<RegionDto[] | null | undefined>;
  constructor(private store: Store<RegionsState>) {}

  ngOnInit(): void {
    this.loadRegions();

    this.regions$ = this.store.select(getRegions);
  }

  loadRegions(countryId: number | undefined = undefined) {
    this.store.dispatch(loadRegions({ payload: countryId }));
  }
}
