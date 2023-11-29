import { NgModule } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';
import { ReportAnalyticsComponent } from './report-analytics.component';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    declarations: [ReportAnalyticsComponent],
    imports: [SharedModule, NgApexchartsModule, TranslocoModule],
    exports: [ReportAnalyticsComponent],
})
export class ReportAnalyticsModule {}
