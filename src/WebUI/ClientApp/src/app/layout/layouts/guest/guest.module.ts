import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GuestLayoutComponent } from './guest.component';
import { SharedModule } from 'app/shared/shared.module';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';

@NgModule({
    declarations: [GuestLayoutComponent],
    imports: [RouterModule, FuseLoadingBarModule, SharedModule],
    exports: [GuestLayoutComponent],
})
export class GuestLayoutModule {}
