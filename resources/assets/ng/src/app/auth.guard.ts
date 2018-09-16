import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service'
import { Observable ,  BehaviorSubject } from 'rxjs';
import { UserService } from './user-features/user.service';
import { IUser } from './models';
import { SessionService } from './session.service';


/**
 * Design and built with help from: https://www.code-sample.com/2018/03/angular-5-auth-guard-and-route-guards.html
 *
 */
@Injectable()
export class AuthGuard implements CanActivate {
  private user:IUser;
  private authenticated: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private session:SessionService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const url: string = state.url;
    let result: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    // if the user is logged in, we redirect them to their info page instead of allowing them to
    // navigate to the login page
    if(this.authenticated === undefined) {
      this.session.getUserAuthenticationStatus()
        .then((user:IUser) => {
          this.authenticated = true;
          this.session.navigateTo(url);
        })
        .catch((err:string) => {
          this.session.navigateQueue.push('login');
          this.session.navigateTo('login');
        });
    } else {
      return this.getActivationStatus(url);
    }
  }

  private getActivationStatus(url:string):boolean {
    if(this.authenticated && url.indexOf('login') > -1) {
      this.session.navigateQueue.push(url);
      this.session.navigateTo('my-information');
      return false;
    } else if(!this.authenticated) {
      this.session.navigateQueue.push(url);
      this.session.navigateTo('login');
      return false;
    }

    return true;
  }

  // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  //   return this.canActivate(route, state);
  // }

  // checkLogin(url?: string): boolean {
  //   if(this.authService.isLoggedIn) {
  //     return true;
  //   }

  //   // store attempted url for redirect
  //   this.authService.redirectUrl = (url === undefined) ? '/' : url;

  //   // navigate to login page with extras
  //   this.router.navigate(['/login']);
  //   return false;
  // }

  // checkedAuthenticatedState(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
  //   let url: string = state.url;
  //   if(this.checkLogin(url)) {
  //     url = (url.match('login')) ? '/' : url;
  //     this.router.navigate([url]);
  //   }
  // }

}
