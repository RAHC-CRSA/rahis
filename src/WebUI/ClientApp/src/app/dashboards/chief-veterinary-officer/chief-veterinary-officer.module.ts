import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChiefVeterinaryOfficerRoutingModule } from './chief-veterinary-officer-routing.module';
import { ChiefVeterinaryOfficerComponent } from './chief-veterinary-officer.component';

@NgModule({
    declarations: [ChiefVeterinaryOfficerComponent],
    imports: [CommonModule, ChiefVeterinaryOfficerRoutingModule],
})
export class VerifierModule {}
