import { NgModule } from '@angular/core';
import { ReporterComponent } from './reporter.component';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: ReporterComponent,
    },
];

@NgModule({
    declarations: [ReporterComponent],
    imports: [SharedModule, RouterModule.forChild(routes)],
})
export class ReporterModule {}
