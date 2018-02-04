import { Component, OnInit } from '@angular/core';
import { MediaService } from './../services/media.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  status: string;
  file: File;
  title: string;
  description: string;

  constructor(public mediaService: MediaService) { }

  ngOnInit() {

    this.mediaService.toggleVisib('front', true);
    this.mediaService.toggleVisib('upload', false);
    this.mediaService.toggleVisib('register', false);
    this.mediaService.toggleVisib('logout', true);
  }

  getFile(event: any) {

    this.file = event.target.files[0];
  }

  upload() {

    const formData: FormData = new FormData();
    formData.append('file', this.file);
    formData.append('title', this.title);
    formData.append('description', this.description);

    this.mediaService.uploadFile(formData)
    .subscribe(res => {

      this.status = 'Upload response: ' + JSON.stringify(res);
    },
    (error: HttpErrorResponse) => this.status = error.error.message);
  } // end upload()
} // end class
