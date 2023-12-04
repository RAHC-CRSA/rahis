import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';

import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

const routes: Route[] = [
    {
        path: '',
        component: ProfileComponent,
    },
];

@NgModule({
    declarations: [ProfileComponent],
    imports: [SharedModule, RouterModule.forChild(routes), TranslocoModule],
})
export class ProfileModule {}
