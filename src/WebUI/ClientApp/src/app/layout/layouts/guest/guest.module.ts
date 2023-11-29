import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GuestLayoutComponent } from './guest.component';
import { SharedModule } from 'app/shared/shared.module';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { LanguagesModule } from 'app/layout/common/languages/languages.module';

@NgModule({
    declarations: [GuestLayoutComponent],
    imports: [RouterModule, FuseLoadingBarModule, SharedModule, LanguagesModule],
    exports: [GuestLayoutComponent],
})
export class GuestLayoutModule {}
