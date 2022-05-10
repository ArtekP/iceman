import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderClientComponent } from './order-client/order-client.component';
import { UserViewComponent } from './user-view/user-view.component';
import { IcecreamListComponent } from './icecream-list/icecream-list.component';
import { MaterialModule } from '../shared/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveComponentModule } from '@ngrx/component';

@NgModule({
  declarations: [
    OrderClientComponent,
    UserViewComponent,
    IcecreamListComponent,
  ],
  imports: [
    ReactiveComponentModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule,
    CommonModule
  ]
})
export class UserModule { }
