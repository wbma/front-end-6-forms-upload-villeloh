import { MediaService } from './services/media.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { FrontComponent } from './front/front.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UploadComponent } from './upload/upload.component';


@NgModule({
  declarations: [
    AppComponent,
    FrontComponent,
    TopBarComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MediaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
