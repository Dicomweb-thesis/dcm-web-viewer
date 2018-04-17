import { Injectable } from '@angular/core';

export const TOKEN_NAME = "jwt_token";
export const ROLE_NAME = "role";
export const USER_NAME = "user_name";
export const USER_ID = "user_id";

@Injectable()
export class LocalStorageService {
  constructor() {
  }

  public getValue(name): string {
    return localStorage.getItem(name);
  }

  public setValue(name, value){
    localStorage.setItem(name, value);
  }

  public removeValue(name){
    localStorage.removeItem(name);
  }
}
