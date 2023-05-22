import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardsComponent } from './dashboards.component';
import { DiseasesComponent } from './components/diseases/diseases.component';
import { SpeciesComponent } from './components/species/species.component';
import { RegionsComponent } from './components/regions/regions.component';
import { UsersComponent } from './components/users/users.component';
import { ReportsComponent } from './components/reports/reports.component';
import { OccurrencesComponent } from './components/occurrences/occurrences.component';
import { InstitutionsComponent } from './components/institutions/institutions.component';
import { ParaProfessionalsComponent } from './components/para-professionals/para-professionals.component';


@NgModule({
  declarations: [
    DashboardsComponent,
    DiseasesComponent,
    SpeciesComponent,
    RegionsComponent,
    UsersComponent,
    ReportsComponent,
    OccurrencesComponent,
    InstitutionsComponent,
    ParaProfessionalsComponent
  ],
  imports: [
    CommonModule,
    DashboardsRoutingModule
  ]
})
export class DashboardsModule { }
