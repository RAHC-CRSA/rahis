import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyReportComponent } from './verify-report.component';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: VerifyReportComponent,
    },
];

@NgModule({
    declarations: [VerifyReportComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class VerifyReportModule {}
