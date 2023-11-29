import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GuestLayoutComponent } from './guest.component';
import { SharedModule } from 'app/shared/shared.module';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { LanguagesModule } from 'app/layout/common/languages/languages.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    declarations: [GuestLayoutComponent],
    imports: [RouterModule, FuseLoadingBarModule, SharedModule, LanguagesModule, TranslocoModule],
    exports: [GuestLayoutComponent],
})
export class GuestLayoutModule {}
