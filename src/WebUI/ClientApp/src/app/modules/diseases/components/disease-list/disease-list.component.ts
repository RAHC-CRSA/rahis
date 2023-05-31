import {
    AfterViewInit,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { loadDiseases } from '../../store/actions/diseases.actions';
import { getDiseases, getDiseasesLoading } from '../../store/selectors';
import { DiseaseState } from '../../store/reducers/diseases.reducer';
import { DiseaseDto } from 'app/web-api-client';

@Component({
    selector: 'app-disease-list',
    templateUrl: './disease-list.component.html',
    styleUrls: ['./disease-list.component.scss'],
})
export class DiseaseListComponent implements OnInit {
    displayedColumns: string[] = [
        'id',
        'name',
        'code',
        'classification',
        'zoonotic',
    ];
    dataSource: MatTableDataSource<DiseaseDto>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    diseases$: Observable<DiseaseDto[] | null | undefined>;
    loading$: Observable<boolean>;

    constructor(private store: Store<DiseaseState>) {}

    ngOnInit() {
        this.store.dispatch(loadDiseases());
        this.diseases$ = this.store.select(getDiseases);
        this.diseases$.subscribe((items) => {
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.loading$ = this.store.select(getDiseasesLoading);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
