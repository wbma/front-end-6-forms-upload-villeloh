import { User } from './../interfaces/user';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http/src/response';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MediaService {

  @Output() registerEmitter = new EventEmitter<boolean>();
  @Output() frontEmitter = new EventEmitter<boolean>();
  @Output() loginEmitter = new EventEmitter<boolean>();
  @Output() logoutEmitter = new EventEmitter<boolean>();
  @Output() uploadEmitter = new EventEmitter<boolean>();

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

  uploadFile(formData: FormData) {

    const url = this.baseApiUrl + 'media';

    // adding Content-Type: multipart/form-data gives an error... while if it's left out, it's added
    // automatically without any problems. -.-
    this.options = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };

    return this.http.post(url, formData, this.options);
  } // end uploadFile()

  getUserStatus() {

    const token = localStorage.getItem('token') || '';
    // non-ideal... if token == null, should return some type of observable, on which subscribe() can be called without errors

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', token)
    };

    return this.http.get(this.baseApiUrl + 'users/user', options);
  } // end getUserStatus()

  // toggles the visibility of the top-bar link elements
  toggleVisib(elemName: string, isElemVisible: boolean) {

    this[elemName.toLowerCase() + 'Emitter'].emit(isElemVisible);
  }
} // end class
