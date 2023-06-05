import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifierRoutingModule } from './verifier-routing.module';
import { VerifierComponent } from './verifier.component';


@NgModule({
  declarations: [
    VerifierComponent
  ],
  imports: [
    CommonModule,
    VerifierRoutingModule
  ]
})
export class VerifierModule { }
