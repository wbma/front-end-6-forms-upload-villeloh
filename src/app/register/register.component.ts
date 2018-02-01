import { User } from './../interfaces/user';
import { MediaService } from './../services/media.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  status: string;
  userName: string;
  passWord: string;
  email: string;
  fullName: string;
  user: User =  { username: '', password: '', email: '', full_name: '' };

  constructor(public mediaService: MediaService) {
  }

  ngOnInit() {

    this.mediaService.toggleVisib('Register', false);
    this.mediaService.toggleVisib('Login', true);
  }

  register(user: User) {

    this.mediaService.tryRegister(user)
    .subscribe(res => {

      this.status = 'Register response: ' + JSON.stringify(res);
      this.mediaService.login(user.username, user.password);
    }
    ,
    (error: HttpErrorResponse) => this.status = error.error.message);
  } // end onSubmit()
} // end class
