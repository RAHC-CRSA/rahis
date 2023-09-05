import { NgModule } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';
import { ReportAnalyticsComponent } from './report-analytics.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [ReportAnalyticsComponent],
    imports: [SharedModule, NgApexchartsModule],
    exports: [ReportAnalyticsComponent],
})
export class ReportAnalyticsModule {}
