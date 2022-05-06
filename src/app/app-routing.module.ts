import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AuthGuard } from './auth/auth.guards';
import { LoginComponent } from './auth/login/login.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { IcecreamListComponent } from './icecream-list/icecream-list.component';
import { OrderClientComponent } from './order-client/order-client.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UserViewComponent } from './user-view/user-view.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user-view', component: UserViewComponent},
  {path: 'admin-view', component: AdminViewComponent, canActivate: [AuthGuard]},
  {path: 'icecream-list', component: IcecreamListComponent},
  {path: 'unit-list', component: UnitListComponent},
  {path: 'clients-list', component: ClientsListComponent},
  {path: 'order-client', component: OrderClientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
