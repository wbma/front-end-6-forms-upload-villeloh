import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { MediaService } from './../services/media.service';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {

  constructor(public mediaService: MediaService, private router: Router) { }

  ngOnInit() {

    // check if the user has the correct auth token (i.e., whether the user is logged in or not)
    this.mediaService.getUserStatus()
    .subscribe( res => {

      this.mediaService.toggleVisib('register', false);
      this.mediaService.toggleVisib('front', false);
      this.mediaService.toggleVisib('login', false);
      this.mediaService.toggleVisib('upload', true);
      this.mediaService.toggleVisib('logout', true);

    }, (error: HttpErrorResponse) => this.router.navigate(['login']));
  } // end ngOnInit()
} // end class
