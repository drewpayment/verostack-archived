import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service'
import { Observable ,  BehaviorSubject, of, Observer } from 'rxjs';
import { UserService } from './user-features/user.service';
import { User, ILocalStorage } from './models';
import { SessionService } from './session.service';
import * as moment from 'moment';


/**
 * Design and built with help from: https://www.code-sample.com/2018/03/angular-5-auth-guard-and-route-guards.html
 *
 */
@Injectable()
export class AuthGuard implements CanActivate {
  private user:User;
  private authenticated: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private session:SessionService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | boolean {
    const url:string = state.url;
    return Observable.create((observer:Observer<boolean>) => this.session.isUserAuthenticated()
      .subscribe((store:ILocalStorage<User>) => {
        if (store && store.expires > moment().valueOf()) {
          observer.next(true);
          observer.complete();
        } else {
          this.session.navigateQueue.push(url);
          this.router.navigateByUrl('login');
          observer.next(false);
          observer.complete();
        }
      }));
  }

}
