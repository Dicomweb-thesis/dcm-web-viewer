import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild,
  ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { ROLE_NAME } from "../services/local-storage.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService,
              private localStorageService: LocalStorageService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated(state)) {
      let role = route.data[ROLE_NAME];
      let userRole = this.localStorageService.getValue(ROLE_NAME);
      if (role != userRole) {
        this.authService.progressWhenLoginFail(state);
        return false;
      }
      return true;
    }

    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
