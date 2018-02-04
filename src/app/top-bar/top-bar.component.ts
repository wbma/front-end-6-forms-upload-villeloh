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
  uploadVisib: boolean;

  constructor(public mediaService: MediaService) { }

  ngOnInit() {

    // I guess this might not be necessary... meh, let's do it just in case
    this.frontVisib = false;
    this.loginVisib = false;
    this.registerVisib = false;
    this.logoutVisib = false;
    this.uploadVisib = false;

    // apparently this is a no-no...
    // however, the 'official' way didn't work for me (I suspect it's because the elements that need to
    // listen to the events are regular li-elements instead of Components)
    this.mediaService.frontEmitter.subscribe(bool => {
      this.frontVisib = bool;
    });

    this.mediaService.loginEmitter.subscribe(bool => {
      this.loginVisib = bool;
    });

    this.mediaService.registerEmitter.subscribe(bool => {
      this.registerVisib = bool;
    });

    this.mediaService.logoutEmitter.subscribe(bool => {
      this.logoutVisib = bool;
    });

    this.mediaService.uploadEmitter.subscribe(bool => {
      this.uploadVisib = bool;
    });
  } // end ngOnInit()
} // end class
