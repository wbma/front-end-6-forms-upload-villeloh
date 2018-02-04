import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { MediaService } from './../services/media.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public mediaService: MediaService, private router: Router) { }

  ngOnInit() {

    // check if the user has the correct auth token (i.e., whether the user is logged in or not)
    this.mediaService.getUserStatus()
    .subscribe( res => {

      this.router.navigate(['front']);

    }, (error: HttpErrorResponse) => {

      console.log(error.error.message);

      // this seems rather clumsy... there must be a better way to toggle the visibility of the top bar items
      this.mediaService.toggleVisib('register', true);
      this.mediaService.toggleVisib('front', false);
      this.mediaService.toggleVisib('login', false);
      this.mediaService.toggleVisib('logout', false);
      this.mediaService.toggleVisib('upload', false);

    });
  }  // end ngOnInit()

  login(userName: string, password: string) {

    this.mediaService.login(userName, password);
  }
} // end class
