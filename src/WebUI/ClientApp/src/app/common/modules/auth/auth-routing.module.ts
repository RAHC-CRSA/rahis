import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    data: {
      title: $localize`Auth`,
    },
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: $localize`Login`,
        },
      },
      {
        path: 'logout',
        component: LogoutComponent,
        data: {
          title: $localize`Logout`,
        },
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: {
          title: $localize`Forgot Password`,
        },
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
