import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { IUser } from './models';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  user:IUser;
  apiUrl:string;
  userLoggedIn:boolean;

  constructor(private session:SessionService, private auth:AuthService) {
    this.session.userItem.subscribe((next:IUser) => { this.user = next; });
    this.apiUrl = this.auth.apiUrl;

    // get user authenticated status from the session service.
    this.session
      .isLoginSubject
      .subscribe((authenticated:boolean) => {
        this.userLoggedIn = authenticated;
      });
  }

  intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
    this.session.navigateQueue.push(request.url);

    // if the url is nothing our WebAPI, we are not going to append HTTP headers
    let url = this.apiUrl.substring(7, 11);
    if(request.url.indexOf(url) == -1 || !this.userLoggedIn) {
      return next.handle(request);
    } else {
      return next.handle(this.session.getTokenRequest(request));
    }
  }

}
