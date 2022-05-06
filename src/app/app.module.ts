import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { MaterialModule } from './auth/login/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './auth/auth.service';
import { UserViewComponent } from './user-view/user-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ToastrModule } from 'ngx-toastr';
import { IcecreamListComponent } from './icecream-list/icecream-list.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { AddUnitModalComponent } from './unit-list/add-unit-modal/add-unit-modal.component';
import { AddIcecreamModalComponent } from './icecream-list/add-icecream-modal/add-icecream-modal.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { AddClientModalComponent } from './clients-list/add-client-modal/add-client-modal.component';
import { StoreModule } from '@ngrx/store';
import { AppState } from './store/app.state';
import { authReducer } from './store/auth';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrderClientComponent } from './order-client/order-client.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidenavListComponent,
    UserViewComponent,
    AdminViewComponent,
    IcecreamListComponent,
    UnitListComponent,
    AddUnitModalComponent,
    AddIcecreamModalComponent,
    ClientsListComponent,
    AddClientModalComponent,
    PageNotFoundComponent,
    OrderClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    StoreModule.forRoot<AppState>({
      auth: authReducer,
    }),
  ],
  providers: [AuthService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
