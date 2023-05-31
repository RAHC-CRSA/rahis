import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReportDto, ReportListDto } from 'src/app/web-api-client';
import { loadReports } from '../../store/actions';
import { getReports, ReportState } from '../../store/reducers';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent implements OnInit {
  reports$: Observable<ReportListDto[] | null | undefined>;

  constructor(private store: Store<ReportState>) {}

  ngOnInit() {
    this.store.dispatch(loadReports());
    this.reports$ = this.store.select(getReports);
  }
}
