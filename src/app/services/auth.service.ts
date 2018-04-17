import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { DataService } from './data.service';
import { TOKEN_NAME, USER_NAME } from "../services/local-storage.service";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient,
              private jwtHelperService: JwtHelperService,
              private router: Router,
              private localStorageService: LocalStorageService,
              private dataService: DataService) {

  }

  private hasTokenValid() {
    const token: string = this.jwtHelperService.tokenGetter();
    if (!token) {
      return false
    }
    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token)
    return !tokenExpired
  }

  public progressWhenLoginFail(state: RouterStateSnapshot){
    this.localStorageService.removeValue(TOKEN_NAME);
    this.dataService.setData(USER_NAME, '')
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  }

  isAuthenticated(state): boolean {
    if (this.hasTokenValid()) {
      return true;
    }  else {
      this.progressWhenLoginFail(state);
      return false;
    }
  }
}
