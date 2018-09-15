import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:Http, public jwtHelper: JwtHelperService) { }

  //Login
  authUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/login', user, {headers: headers}).pipe(map(res => res.json()));
  }

  //Checks if user is logged in
    loggedIn() {
        const token = localStorage.getItem('authToken');
        return token != null && !this.jwtHelper.isTokenExpired(token);
    }

  logOut()  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadUserProfile() {
    // Gets string from the localStorage and parses it into an obj
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  getCurrentUserType() {
    this.user = this.loadUserProfile();
    if (this.user != null && this.user !== undefined) {
      return this.user.type;
    } else {
      return null;
    }
  }

  getCurrentUserName() {
    this.user = this.loadUserProfile();
    if (this.user != null && this.user !== undefined) {
      return this.user.name;
    } else {
      return null;
    }
  }

  storeData(user, token) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadTokenUser(headers) {
    const token = localStorage.getItem('authToken');
    this.authToken = token;
    headers.append('Authorization', token);
  }

  retrieveTokenUser() {
    return localStorage.getItem('authToken');
  }

  registerStudent(token) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('student/register', { 'tokenq': token }, {headers: headers}).pipe(map(res => res.json()));
  }

}
