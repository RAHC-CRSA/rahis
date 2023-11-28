import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

export const routes: Route[] = [
    {
        path: '',
        component: HomeComponent,
    },
];

@NgModule({
    declarations: [HomeComponent],
    imports: [SharedModule, RouterModule.forChild(routes)],
})
export class HomeModule {}
