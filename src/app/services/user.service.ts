import { User } from "../models/user";
// import { Theme } from "../models/theme";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import {TOKEN_NAME, ROLE_NAME, USER_ID} from '../services/local-storage.service';
import { LocalStorageService } from "../services/local-storage.service";

import { error } from "util";
import { environment } from "../../environments/environment";

@Injectable()
export class UserService {
  private headers: HttpHeaders;
  private apiNodeUrl: string;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    // this.headers = new HttpHeaders({
    //   "Content-Type": "application/json",
    //   'Accept': "application/json",
    //   "Access-Control-Allow-Headers": "Content-Type",
    //   // "Access-Control-Allow-Origin": "*"
    // });
    this.apiNodeUrl = environment.apiUrlNode;
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.apiNodeUrl + "/users")
      .catch(error => this.handleError(error));
  }

  tryLogin(user: User) {
    return this.http
      .post(
        this.apiNodeUrl + "/login",
        {
          username: user.username,
          password: user.password
        }
        // ,{headers:this.headers}
      )
      .map(res => this.processResponse(res, this.localStorageService))
      .catch(error => this.handleError(error));
  }

private handleError(error: any) {
    console.log(error);
    if (error instanceof Response) {
      return Observable.throw(error.json()["error"] || "backend server error");
    }
    return Observable.throw(error || "backend server error");
  }

  tryLogout() {
    // remove user from local storage to log user out
    this.localStorageService.removeValue(TOKEN_NAME);
    this.localStorageService.removeValue(USER_ID);
  }

  private processResponse(res, localStorageSer: LocalStorageService) {
    // login successful if there's a jwt token in the response
    if (res.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorageSer.setValue(TOKEN_NAME, res.token);
      localStorageSer.setValue(ROLE_NAME, res.role);

    }
    return res;
  }

  // isUsernameUnique(user: User): Observable<boolean> {
  //   let apiUrl =
  //     this.apiNodeUrl + "users/" + user.id + "/isUnique/" + user.username;
  //   return this.http
  //     .get<any>(apiUrl, { headers: this.headers })
  //     .catch(error => this.handleError(error));
  // }
  //

}
