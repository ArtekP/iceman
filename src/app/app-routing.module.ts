import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guards';
import { LoginComponent } from './auth/login/login.component';
import { UserGuard } from './auth/user.guard';
import { ClientsListComponent } from './admin/clients-list/clients-list.component';
import { IcecreamListAdminComponent } from './admin/icecream-list-admin/icecream-list-admin.component';
import { IcecreamListComponent } from './user/icecream-list/icecream-list.component';
import { OrderAdminComponent } from './admin/order-admin/order-admin.component';
import { OrderClientComponent } from './user/order-client/order-client.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { UnitListComponent } from './admin/unit-list/unit-list.component';
import { UserViewComponent } from './user/user-view/user-view.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user-view', component: UserViewComponent, canActivate: [AuthGuard, UserGuard], children: [
    {path: 'icecream-list', component: IcecreamListComponent},
    {path: 'order-client', component: OrderClientComponent},
  ]},
  {path: 'admin-view', component: AdminViewComponent, canActivate: [AuthGuard, AdminGuard], children: [
    {path: 'unit-list', component: UnitListComponent},
    {path: 'clients-list', component: ClientsListComponent},
    {path: 'order-admin', component: OrderAdminComponent},
    {path: 'icecream-list-admin', component: IcecreamListAdminComponent}
  ]},
  {path: '**', component: PageNotFoundComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
