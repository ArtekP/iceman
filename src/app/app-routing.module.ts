import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guards';
import { LoginComponent } from './auth/login/login.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { IcecreamListComponent } from './icecream-list/icecream-list.component';
import { OrderAdminComponent } from './order-admin/order-admin.component';
import { OrderClientComponent } from './order-client/order-client.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UserViewComponent } from './user-view/user-view.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user-view', component: UserViewComponent, canActivate: [AuthGuard]},
  {path: 'admin-view', component: AdminViewComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'icecream-list', component: IcecreamListComponent, canActivate: [AuthGuard]},
  {path: 'unit-list', component: UnitListComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'clients-list', component: ClientsListComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'order-admin', component: OrderAdminComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'order-client', component: OrderClientComponent, canActivate: [AuthGuard]},
  {path: '**', component: PageNotFoundComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
