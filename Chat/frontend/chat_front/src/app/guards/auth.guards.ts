import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { IdentityService } from '../services/identity.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private identityService: IdentityService, private router: Router) {}

  canActivate(): boolean {
    if (!this.identityService.isLogged) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
