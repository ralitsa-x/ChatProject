import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router } from "@angular/router";
import { IdentityService } from '../services/identity.service';

@Injectable({
  providedIn:'root',
})
export class NoAuthGuard implements CanActivate{
  private router : Router;
  constructor(private identityService : IdentityService, router : Router){
    this.router = router;
    this.identityService = identityService;
  };

  canActivate():boolean {
    if(this.identityService.isLogged){
      this.router.navigate(['/']);
      return false;
    }
    return true;

  }
}
