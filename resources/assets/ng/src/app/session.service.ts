import { Injectable, OnInit } from '@angular/core';
import { IUser } from './models/user.model';
import { Observable, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { MatSidenav } from '@angular/material';
import { LocalStorage, JSONSchema } from '@ngx-pwa/local-storage';
import { ILocalStorage, IToken, IClient } from './models';
import { HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { IRole } from '@app/models/role.model';
import { environment } from '../environments/environment';

const rootUrl = environment.rootUrl;

const schema: JSONSchema = {
  properties: {
    expires: { type: 'integer' },
    data: { type: 'object' }
  },
  required: ['expires', 'data']
};

@Injectable()
export class SessionService implements OnInit {
  static defaultUserUrl = 'my-information';

  sessionUser: Observable<IUser>;
  private sidenav: MatSidenav;

  dataStore:{user:IUser, token:IToken} = {
    user: null,
    token: null
  };

  navigateQueue:string[] = [];
  loggedInService:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userLoggedIn:boolean;

  // FIXME: This doesn't work... If we subscribe to this for multiple types it will update everytime and the child files
  // will try to change the data type
  private storageItem$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  storageItem: Observable<any>;

  private userItem$:Subject<IUser> = new ReplaySubject<IUser>(1);
  userItem: Observable<IUser>;

  private tokenItem$:Subject<IToken> = new ReplaySubject<IToken>(1);
  tokenItem: Observable<IToken>;

  loading$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingState:Observable<boolean>;

  private hasTokenSubject = new ReplaySubject<boolean>(1);
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private localStorage: LocalStorage, private router: Router) {
    // make sure we're removing expired cookies on app boot
    this.pruneExpiredStorage();
    for(let p in this.dataStore) {
      this.getItem(p);
    }

    this.userItem = this.userItem$.asObservable();
    this.tokenItem = this.tokenItem$.asObservable();
    this.loadingState = this.loading$.asObservable();
  }

  ngOnInit() {}

  get isUserLoggedIn():boolean {
    return this.userLoggedIn;
  }

  private hasToken():boolean {
    this.hasTokenSubject.subscribe((hasToken:boolean) => {
      this.userLoggedIn = hasToken;
    });
    this.localStorage.getItem('token')
      .toPromise()
      .then((item:ILocalStorage<IToken>) => {
        if(item == null) return;
        if(Date.now() >= item.expires) {
          this.removeItem('token');
          this.isLoginSubject.next(false);
        } else {
          this.dataStore.token = item.data;
          this.tokenItem$.next(item.data);
          this.isLoginSubject.next(true);
        }
      });
    return this.userLoggedIn;
  }

  login(token:ILocalStorage<IToken>):void {
    this.setToken(token.data);
    this.setItem('token', token);
    this.hideLoader();
    this.navigateTo('/');
  }

  logout():void {
    this.clearStorage();
    this.isLoginSubject.next(false);
    this.hasTokenSubject.next(false);
    this.navigateTo('login');
  }

  getUserItem():Observable<IUser> {
    return this.userItem$.asObservable();
  }

  get userHomePage() {
    return SessionService.defaultUserUrl;
  }

  /**
   * Updates the app's loading spinner status. It is recommended to use the hide/show methods though.
   *
   * @param loading
   */
  updateLoadingState(loading:boolean):void {
    this.loading$.next(loading);
  }

  // hide the loading graphics
  hideLoader():void {
    this.loading$.next(false);
  }

  // show the loading graphics
  showLoader():void {
    this.loading$.next(true);
  }

  /**
   * Access router instance and redirect user to the view of your choice.
   *
   * @param view string
   */
  navigateTo(view:string):void {
    this.navigateQueue.push(view);
    this.router.navigate([view]);
  }

  navigateByUrl(url:string):void {
    this.router.navigateByUrl(url);
  }

  /**
   * Navigate back to a page the user has been to very the navigation queue.
   *
   * @param index
   */
  navigateBack(index:number = 1):Promise<any> {
    return this.router.navigateByUrl(this.navigateQueue[index]);
  }

  /**
   * Updates the user item in the session
   *
   * @param user
   */
  setUser(user:IUser) {
    this.userItem$.next(user);
  }

  /**
   * What is this doing????
   *
   * @param sidenav
   */
  setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  open(): Promise<any> {
    return this.sidenav.open();
  }

  close(): Promise<any> {
    return this.sidenav.close();
  }

  toggle(isOpen?: boolean): Promise<any> {
    return this.sidenav.toggle(isOpen);
  }

  setToken(token:IToken):void {
    this.isLoginSubject.next(true);
    this.hasTokenSubject.next(true);
    this.dataStore.token = token;
    this.tokenItem$.next(token);
  }

  setItem<T>(itemName:string, data:ILocalStorage<T>): void {
    if(this.dataStore[itemName]) this.dataStore[itemName] = data.data;
    data.expires = Date.now() + (1000 * 60 * data.expires);
    this.localStorage.setItemSubscribe(itemName, data);
  }

  getItem(itemName:string):void {
    itemName = itemName.trim().toLowerCase();
    this.localStorage
      .getItem(itemName)
      .subscribe((next:ILocalStorage<any>) => {
        if(next == null) {
          return;
        } else if(Date.now() >= next.expires) {
          this.hasTokenSubject.next(false);
          this.isLoginSubject.next(false);
          this.removeItem(itemName);
        } else if(itemName === 'user') {
          this.hasTokenSubject.next(true);
          this.isLoginSubject.next(true);
          this.dataStore.user = next.data;
          this.userItem$.next(<IUser>next.data);
        } else if(itemName === 'token') {
          this.hasTokenSubject.next(true);
          this.isLoginSubject.next(true);
          this.dataStore.token = next.data;
          this.tokenItem$.next(<IToken>next.data);
        }
        this.loggedInService.next(this.userLoggedIn);
      });
  }

  /**
   * Explicit method to load user item from storage.
   *
   */
  loadUserStorageItem():void {
    this.pruneExpiredStorage();
    this.localStorage.getItem('user')
      .subscribe((item:ILocalStorage<IUser>) => {
        if(item == null) return;

        if(item.expires <= Date.now()) {
          this.userLoggedIn = false;
          this.removeItem('user');
        } else {
          this.userLoggedIn = true;
          this.dataStore.user = item.data;
          this.userItem$.next(item.data);
        }
        this.loggedInService.next(this.userLoggedIn);
      });
  }

  /**
   * Explicit method to load token item from storage.
   *
   */
  loadTokenStorageItem():void {
    this.pruneExpiredStorage();
    this.localStorage.getItem('token')
      .subscribe((item:ILocalStorage<IToken>) => {
        if(item == null) return;

        if(item.expires <= Date.now()) {
          this.userLoggedIn = false;
          this.removeItem('token');
        } else {
          this.userLoggedIn = this.userLoggedIn || true;
          this.dataStore.token = item.data;
          this.tokenItem$.next(item.data);
        }
        this.loggedInService.next(this.userLoggedIn);
      });
  }

  /**
   * Removes an item from the localstorage.
   *
   * @param itemName
   */
  removeItem(itemName: string): void {
    this.localStorage.removeItemSubscribe(itemName);
  }

  /**
   * Forces an item from localstorage. Returns the observable.
   *
   * @param itemName
   */
  expediteItem(itemName:string):Observable<any> {
    return this.localStorage.getItem(itemName);
  }

  /**
   * Returns a promise with the user from local storage.
   */
  getUserAuthenticationStatus():Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      this.localStorage
        .getItem('user')
        .subscribe((item:ILocalStorage<IUser>) => {
          if(item == null) reject('Not logged in.');
          if(item.expires <= Date.now()) {
            this.removeItem('user');
            reject('Login has expired. Please log back in.');
          } else {
            resolve(item.data);
          }
        });
    });
  }

  isExpiredItem(key:string, expires:number):boolean {
    let result = false;
    if(Date.now() > expires) {
      this.removeItem(key);
      result = true;
    }
    return result;
  }

  /**
   * Iterates through all stored objects in localstorage
   * and checks their expiration dates. If the object has passed
   * its expiration date, it is invalidated and the object is
   * removed.
   *
   */
  pruneExpiredStorage(): void {
    let values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while(i--) {
      values.push({
        key: keys[i],
        data: this.localStorage.getItem(keys[i])
      });
    }

    for(let v = 0; v < values.length; v++) {
      let item = values[v];
      if(Date.now() > item.data.expires) {
        this.removeItem(item.key);
      }
    }
  }

  clearStorage(): void {
    this.localStorage.clearSubscribe();
    this.userItem$.next({
      id: 0,
      username: null,
      email: null,
      firstName: null,
      lastName: null,
      hasOnboarding: false,
      role: <IRole>{ role: null },
      selectedClient: <IClient>{clientId:null},
      clients: [],
      createdAt: null,
      session: null,
      updatedAt: null
    });
    this.tokenItem$.next(null);
  }

  /**
   * When the user has been logged in, we need to make sure we are appending these to every HTTP call,
   * so that the user can make authorized calls to the server.
   *
   */
  getTokenRequest(request:HttpRequest<any>):HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.dataStore.token.access_token
      }
    });
  }

}
