import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporterRoutingModule } from './reporter-routing.module';
import { ReporterComponent } from './reporter.component';


@NgModule({
  declarations: [
    ReporterComponent
  ],
  imports: [
    CommonModule,
    ReporterRoutingModule
  ]
})
export class ReporterModule { }
