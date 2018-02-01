import { User } from './../interfaces/user';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http/src/response';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MediaService {

  @Output() toggleRegister = new EventEmitter<boolean>();
  @Output() toggleFront = new EventEmitter<boolean>();
  @Output() toggleLogin = new EventEmitter<boolean>();
  @Output() toggleLogout = new EventEmitter<boolean>();

  status: string;
  baseApiUrl = 'http://media.mw.metropolia.fi/wbma/';

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(private http: HttpClient, private router: Router) {
  }

  tryRegister(user: User) {

    const url = this.baseApiUrl + 'users';

    return this.http.post(url, user, this.options);
  }

  // the naming is a bit inconsistent, but then the methods behave a bit differently... meh, it's ok enough.
  login(userName: string, passWord: string) {

    const url = this.baseApiUrl + 'login';
    const body = `{ "username": "${userName}", "password": "${passWord}" }`;

    return this.http.post(url, body, this.options).subscribe(res => {

      localStorage.setItem('token', res['token']);
      this.router.navigate(['front']);
    },
    (error: HttpErrorResponse) => this.status = error.error.message);
  } // end login()

  logout() {

    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  getUserStatus() {

    let token = localStorage.getItem('token');

    if (token == null || token === undefined) {
      token = ''; // non-ideal... should return some type of observable, on which subscribe() can be called without errors
    }

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', token)
    };

    return this.http.get(this.baseApiUrl + 'users/user', options);
  } // end getUserStatus()

  toggleVisib(elemName: string, isElemVisible: boolean) {

    this['toggle' + elemName].emit(isElemVisible);
  }
} // end class
