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
    return false;
  }

}
