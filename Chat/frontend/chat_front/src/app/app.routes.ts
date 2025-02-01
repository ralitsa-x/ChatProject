import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './guards/auth.guards';
import { NoAuthGuard } from './guards/no-auth.guards';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],  // AuthGuard applied to Home route
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard],  // NoAuthGuard applied to Login route
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard],  // NoAuthGuard applied to Register route
  },
  {
    path: '**', // wildcard route for unknown paths
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
