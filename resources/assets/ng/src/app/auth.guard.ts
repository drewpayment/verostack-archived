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
    const url:string = state.url;
    if (this.session.isUserLoggedIn) return true;

    this.session.navigateQueue.push(url);
    this.router.navigateByUrl('login');
    this.router.dispose();
    return false;
  }

  // private getActivationStatus(url:string):boolean {
  //   if(this.authenticated && url.indexOf('login') > -1) {
  //     this.session.navigateQueue.push(url);
  //     this.router.navigateByUrl('my-information');
  //     return false;
  //   } else if(!this.authenticated) {
  //     this.session.navigateQueue.push(url);
  //     this.router.navigateByUrl('login');
  //     return false;
  //   }

  //   return true;
  // }

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
