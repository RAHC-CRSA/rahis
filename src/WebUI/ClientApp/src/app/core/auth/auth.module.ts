import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthInterceptor } from 'app/core/auth/auth.interceptor';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { authReducer } from './store/reducers';
import { featureKey } from './store/actions/auth.actions';
import { effects } from './store/effects';

@NgModule({
    imports: [
        HttpClientModule,
        StoreModule.forFeature(featureKey, authReducer),
        EffectsModule.forFeature(effects),
    ],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
})
export class AuthModule {}
