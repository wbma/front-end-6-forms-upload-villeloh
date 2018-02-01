import { Component, OnInit } from '@angular/core';
import { MediaService } from './../services/media.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  frontVisib: boolean;
  loginVisib: boolean;
  registerVisib: boolean;
  logoutVisib: boolean;

  constructor(public mediaService: MediaService) { }

  ngOnInit() {

    // we start on the login page, so all but register are invisible
    this.frontVisib = false;
    this.loginVisib = false;
    this.registerVisib = true;
    this.logoutVisib = false;

    // apparently this is a no-no...
    // however, the 'official' way didn't work for me (I suspect it's because the elements that need to
    // listen to the events are regular li-elements instead of Components)
    this.mediaService.frontEmitter.subscribe(bool => {
      this.toggleFront(bool);
    });

    this.mediaService.loginEmitter.subscribe(bool => {
      this.toggleLogin(bool);
    });

    this.mediaService.registerEmitter.subscribe(bool => {
      this.toggleRegister(bool);
    });

    this.mediaService.logoutEmitter.subscribe(bool => {
      this.toggleLogout(bool);
    });
  } // end ngOnInit()

  toggleRegister(value: boolean) {

    this.registerVisib = value;
  }

  toggleFront(value: boolean) {

    this.frontVisib = value;
  }

  toggleLogin(value: boolean) {

    this.loginVisib = value;
  }

  toggleLogout(value: boolean) {

    this.logoutVisib = value;
  }

  logout() {
    this.mediaService.logout();
  }

} // end class
