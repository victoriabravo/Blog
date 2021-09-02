import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

export const AUTH_TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private http: HttpClient
  ) { }

  login(user:User){
    sessionStorage.setItem(AUTH_TOKEN_KEY, user.username)
  }

  getToken(){
   const token = sessionStorage.getItem('token');
    return token
  }

  saveToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  isAuthorized(){
    return !!sessionStorage.getItem('token')
  }
}

export interface User{
  username: string;
  password:string;
}
