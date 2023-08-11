import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RahOfficerRoutingModule } from './rah-officer-routing.module';
import { RahOfficerComponent } from './rah-officer.component';

@NgModule({
    declarations: [RahOfficerComponent],
    imports: [CommonModule, RahOfficerRoutingModule],
})
export class RahOfficerModule {}
