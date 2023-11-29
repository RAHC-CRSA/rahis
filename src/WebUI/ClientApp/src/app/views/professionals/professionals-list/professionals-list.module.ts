import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessionalsListComponent } from './professionals-list.component';
import { Route, RouterModule } from '@angular/router';
import { ProfessionalsModule } from 'app/modules/professionals/professionals.module';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';

export const routes: Route[] = [
    {
        path: '',
        component: ProfessionalsListComponent,
    },
];

@NgModule({
    declarations: [ProfessionalsListComponent],
    imports: [ProfessionalsModule, SharedModule, RouterModule.forChild(routes), TranslocoModule],
})
export class ProfessionalsListModule {}
