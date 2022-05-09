import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { AddUnitModalComponent } from './unit-list/add-unit-modal/add-unit-modal.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { AddClientModalComponent } from './clients-list/add-client-modal/add-client-modal.component';
import { OrderAdminComponent } from './order-admin/order-admin.component';
import { IcecreamListAdminComponent } from './icecream-list-admin/icecream-list-admin.component';
import { AddIcecreamModalComponent } from './icecream-list-admin/add-icecream-modal/add-icecream-modal.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveComponentModule } from '@ngrx/component';



@NgModule({
  declarations: [
    AdminViewComponent,
    UnitListComponent,
    AddUnitModalComponent,
    ClientsListComponent,
    AddClientModalComponent,
    OrderAdminComponent,
    IcecreamListAdminComponent,
    AddIcecreamModalComponent,
  ],
  imports: [
    ReactiveComponentModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    CommonModule
  ]
})
export class AdminModule { }
