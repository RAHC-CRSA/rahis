import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { usersReducer as reducer } from './store/reducers';
import { featureKey } from './store/actions';
import { UsersEffects as effects } from './store/effects/users.effects';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule,
} from '@coreui/angular';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserCreateComponent,
    UserListComponent,
    UserDetailComponent,
  ],
  imports: [
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    SharedModule,
    CommonModule,
    UsersRoutingModule,
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature(effects),  
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule {}
