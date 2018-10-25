import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionService } from './session.service';
import { MessageService } from './message.service';
import { IClient } from './models';
import { IUserRole } from './models/role.model';
import { UserService } from './user-features/user.service';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  apiUrl:string = environment.apiUrl;
  roles: IUserRole[];
  redirectUrl: string = '/';
  private selectedClient: BehaviorSubject<IClient> = new BehaviorSubject<IClient>(null);
  loading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private session: SessionService,
    private userService: UserService,
    private msg: MessageService
  ) {}

  /**
   * User attempted oauth login. This could potentially offer oauth2 login services through
   * other authentication methods like google/facebook.
   *
   * @param data
   * @param callback
   */
  login(data: any) : Promise<any> {
    this.loading = true;
    this.session.clearStorage();
    const url = this.apiUrl + 'oauth/token';

    return this.http.post(url, data).toPromise();
  }

  /**
   * Log out. Clears session storage.
   *
   */
  logout():Promise<string> {
    return new Promise<string>(resolve => {
      this.redirectUrl = this.router.routerState.snapshot.url;
      this.session.logout();
      this.userService.logout();

      resolve(this.redirectUrl);
    });
  }

  /**
   * Get's user from the database by the username after they've been authenticated and issued
   * a token.
   *
   * @param username
   * @param callback
   */
  getUserSession(username: string, callback?: any) : Promise<any> {
    const url = this.apiUrl + 'api/users/' + username + '/session';
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .toPromise()
        .then(
          result => {
            this.populateUserRoles()
              .then(data => this.roles = data);
            resolve(result);
          },
          err => reject(err)
        )
    });
  }

  setSession(key: string, value: any): void {
    this.session[key] = value;
  }

  /**
   * Gets all user roles.
   */
  private populateUserRoles(): Promise<any> {
    return this.http.get(this.apiUrl + 'api/utilities/get-user-roles').toPromise();
  }

}
