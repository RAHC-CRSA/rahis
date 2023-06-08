import { NgModule } from '@angular/core';
import { VerifierComponent } from './verifier.component';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        component: VerifierComponent,
    },
];

@NgModule({
    declarations: [VerifierComponent],
    imports: [SharedModule, RouterModule.forChild(routes)],
})
export class VerifierModule {}
