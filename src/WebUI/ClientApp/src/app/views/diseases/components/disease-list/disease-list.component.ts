import {
  AfterContentChecked,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadDiseases } from '../../store/actions/diseases.actions';
import { getDiseases } from '../../store/reducers';
import { DiseaseState } from 'src/app/views/diseases/store/reducers/diseases.reducer';
import { DiseaseModel as Disease } from 'src/app/models';

@Component({
  selector: 'app-disease-list',
  templateUrl: './disease-list.component.html',
  styleUrls: ['./disease-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DiseaseListComponent implements OnInit, AfterContentChecked {
  @ViewChild('zoonoticTemplate') zoonoticTemplate: TemplateRef<any>;
  columns: any[] = [];

  diseases$: Observable<Disease[]> | undefined;

  constructor(private store: Store<DiseaseState>) {}

  ngOnInit() {
    this.store.dispatch(loadDiseases());
    this.diseases$ = this.store.select(getDiseases);
  }

  ngAfterContentChecked() {
    this.columns = [
      {
        name: 'ID',
      },
      {
        name: 'Name',
      },
      {
        name: 'Classification',
      },
      {
        name: 'Zoonotic',
        cellTemplate: this.zoonoticTemplate,
      },
    ];
  }
}
