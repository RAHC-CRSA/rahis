import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgApexchartsModule } from 'ng-apexcharts';
import { ReportAnalyticsComponent } from './report-analytics.component';

@NgModule({
    declarations: [ReportAnalyticsComponent],
    imports: [CommonModule, NgApexchartsModule],
    exports: [ReportAnalyticsComponent],
})
export class ReportAnalyticsModule {}
