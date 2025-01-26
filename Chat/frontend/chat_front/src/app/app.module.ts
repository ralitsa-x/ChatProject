import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
//import { MainComponent } from './components/shared/main/main.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
//import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guards';
import { NoAuthGuard } from './services/no-auth.guards';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
];

@NgModule({
  imports: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard, NoAuthGuard],
  //bootstrap: [AppComponent]
})
export class AppModule { }
