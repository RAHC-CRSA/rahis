import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

import { diseaseReducer as reducer } from './store/reducers';
import { featureKey } from './store/actions/diseases.actions';
import { DiseaseEffects as effects } from './store/effects/diseases.effects';

import { DiseasesRoutingModule } from './diseases-routing.module';
import { DiseasesComponent } from './diseases.component';
import { DiseaseCreateComponent } from './components/disease-create/disease-create.component';
import { DiseaseListComponent } from './components/disease-list/disease-list.component';
import DiseaseDetailComponent from './components/disease-detail/disease-detail.component';

@NgModule({
    declarations: [
        DiseasesComponent,
        DiseaseCreateComponent,
        DiseaseListComponent,
        DiseaseDetailComponent,
    ],
    imports: [
        CommonModule,
        DiseasesRoutingModule,
        StoreModule.forFeature(featureKey, reducer),
        EffectsModule.forFeature(effects),
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
    ],
})
export class DiseasesModule {}
