import {Injectable} from '@angular/core';
import {User} from './models/user.model';
import {Observable, BehaviorSubject, Subject, ReplaySubject, Observer, forkJoin} from 'rxjs';
import {MatSidenav} from '@angular/material';
import {LocalStorage, JSONSchema} from '@ngx-pwa/local-storage';
import {ILocalStorage, IToken} from './models';
import {HttpRequest} from '@angular/common/http';
import {Router, NavigationEnd} from '@angular/router';
import {environment} from '../environments/environment';

import * as moment from 'moment';
import { filter, map } from 'rxjs/operators';
import { UserService } from './user-features/user.service';

declare var window: any;

const rootUrl = environment.rootUrl;


@Injectable({
    providedIn: 'root'
})
export class SessionService {
    static defaultUserUrl = 'my-information';
    private sidenav: MatSidenav;

    dataStore: {user: User; token: IToken} = {
        user: null,
        token: null
    };

    navigateQueue: string[] = [];
    loggedInService: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private userLoggedIn: boolean;
    userItem = new BehaviorSubject<User>(null);

    private tokenItem$: Subject<IToken> = new ReplaySubject<IToken>(1);
    tokenItem: Observable<IToken>;

    loading$ = new BehaviorSubject<boolean>(false);

    private _hasToken = new BehaviorSubject<boolean>(false);
    isLoginSubject = new BehaviorSubject<boolean>(false);

    previousUrl = '';
    currentUrl = '';

    private _navigationTitle:string = environment.defaultTitle;
    navigationTitle$ = new BehaviorSubject<string>(this._navigationTitle);

    constructor(
        private localStorage: LocalStorage, 
        private router: Router
    ) {
        // make sure we're removing expired cookies on app boot
        this.pruneExpiredStorage();
        for (const p in this.dataStore) {
            this.getItem(p);
        }

        this.tokenItem = this.tokenItem$.asObservable();

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((e:any) => {
            this.previousUrl = this.currentUrl;
            this.currentUrl = e.url;
        });

        // this.userItem.pipe(map(u => u.selectedClient = this._selectedClient));
    }

    // private _selectedClient():number {
    //     return this.userItem.getValue().sessionUser.sessionClient;
    // }

    get lastUser(): User {
        const u = this.userItem.value;
        if (u.selectedClient == null) {
            u.selectedClient = u.sessionUser.client != null 
                ? u.sessionUser.client
                : u.clients.find(c => c.clientId == u.sessionUser.sessionClient);
        }
        return u;
    }

    setNavigationTitle(value:string) {
        if (typeof value !== 'string' || value == null) return;
        this._navigationTitle = value;
        this.navigationTitle$.next(this._navigationTitle);
    }

    private getToken():Observable<ILocalStorage<IToken>> {
        return Observable.create((observer:Observer<ILocalStorage<IToken>>) => {

            this.localStorage
                .getItem('token')
                .subscribe((token:ILocalStorage<IToken>) => {
                    if (token == null) return;

                    if (Date.now() >= token.expires) {
                        this.removeItem('token');
                        this.isLoginSubject.next(false);
                    } else {
                        this.dataStore.token = token.data;
                        this.tokenItem$.next(token.data);
                        this.isLoginSubject.next(true);
                    }

                    observer.next(token);
                    observer.complete();
                });

        });
    }

    login(token: ILocalStorage<IToken>): void {
        this.setToken(token.data);
        this.setItem('token', token);
        this.hideLoader();
    }

    logout(): void {
        this.clearStorage();
        this.isLoginSubject.next(false);
        this._hasToken.next(false);
        this.router.navigateByUrl('login');
    }

    getUserItem():Observable<User> {
        return this.userItem;
    }

    // hide the loading graphics
    hideLoader(): void {
        this.loading$.next(false);
    }

    // show the loading graphics
    showLoader(): void {
        this.loading$.next(true);
    }

    /**
     * Access router instance and redirect user to the view of your choice.
     *
     * @param view string
     */
    navigateTo(view: string): void {
        this.navigateQueue.push(view);
        this.router.navigateByUrl(view);
    }

    navigateByUrl(url: string): void {
        this.router.navigateByUrl(url);
    }

    /**
     * Navigate back to a page the user has been to very the navigation queue.
     *
     * @param index
     */
    navigateBack(index: number = 1): Promise<any> {
        return this.router.navigateByUrl(this.navigateQueue[index]);
    }

    /**
     * Updates the user item in the session
     *
     * @param user
     */
    setUser(user: User) {
        this.userItem.next(user);
    }

    setToken(token: IToken) {
        this.isLoginSubject.next(true);
        this._hasToken.next(true);
        this.dataStore.token = token;
        this.tokenItem$.next(token);
    }

    setItem<T>(itemName: string, data:ILocalStorage<T>) {
        if (this.dataStore[itemName]) this.dataStore[itemName] = data.data;
        data.expires =
            data.expires == null ? moment().valueOf() + moment.duration(3, 'days').milliseconds() : data.expires;
        this.localStorage.setItemSubscribe(itemName, data);
    }

    getItem(itemName: string) {
        itemName = itemName.trim().toLowerCase();
        this.localStorage.getItem(itemName).subscribe((next: ILocalStorage<any>) => {
            if (next == null) {
                return;
            } else if (Date.now() >= next.expires) {
                this._hasToken.next(false);
                this.isLoginSubject.next(false);
                this.removeItem(itemName);
            } else if (itemName === 'user') {
                this._hasToken.next(true);
                this.isLoginSubject.next(true);
                this.dataStore.user = next.data;
                this.userItem.next(<User>next.data);
            } else if (itemName === 'token') {
                this._hasToken.next(true);
                this.isLoginSubject.next(true);
                this.dataStore.token = next.data;
                this.tokenItem$.next(<IToken>next.data);
            }
            this.loggedInService.next(this.userLoggedIn);
        });
    }

    /**
     * Exposes our localstorage user via the session service.
     */
    isUserAuthenticated(): Observable<ILocalStorage<User>> {
        return this.localStorage.getItem('user') as Observable<ILocalStorage<User>>;
    }

    /**
     * Explicit method to load user item from storage.
     *
     */
    loadUserStorageItem(): void {
        this.localStorage.getItem('user').subscribe((item: ILocalStorage<User>) => {
            if (item == null) {
                this.userLoggedIn = false;
                return;
            }

            if (item.expires <= moment().valueOf()) {
                this.userLoggedIn = false;
                this.removeItem('user');
            } else {
                this.userLoggedIn = true;
                this.dataStore.user = item.data;
                this.userItem.next(item.data);
            }

            this.loggedInService.next(this.userLoggedIn);
        });
    }

    /**
     * Explicit method to load token item from storage.
     *
     */
    getAuthenticationStorageItems():Observable<AuthenticationStorageItems> {
        this.pruneExpiredStorage();

        return Observable.create((observer:Observer<AuthenticationStorageItems>) => {
            forkJoin(
                this.localStorage.getItem<ILocalStorage<IToken>>('token'),
                this.localStorage.getItem<ILocalStorage<User>>('user')
            ).subscribe(([storageToken, storageUser]) => {
                if (storageToken == null || storageUser == null) {
                    //this._logoutUser(); this is always routing user to login page on page load even if they aren't a signed in user... 
                    observer.next(null);
                    observer.complete();
                    return;
                }
                    
                const token:ILocalStorage<IToken> = storageToken as ILocalStorage<IToken>;
                const user:ILocalStorage<User> = storageUser as ILocalStorage<User>;
                const payload:AuthenticationStorageItems = {
                    token: token,
                    user: user
                };
    
                if (token.expires <= Date.now()) {
                    // this._logoutUser(); this is always routing user to login page on page load even if they aren't a signed in user... 
                    observer.next(null);
                    observer.complete();
                } else {
                    this.userLoggedIn = true;
                    this.dataStore.token = token.data;
                    this.tokenItem$.next(token.data);
                    this.loggedInService.next(true);
                    observer.next(payload);
                    observer.complete();
                }
            });
        });
    }

    private _logoutUser() {
        this.userLoggedIn = false;
        this.localStorage.clearSubscribe();
        this.loggedInService.next(false);
        this.router.navigate(['login']);
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
     * Iterates through all stored objects in localstorage
     * and checks their expiration dates. If the object has passed
     * its expiration date, it is invalidated and the object is
     * removed.
     *
     */
    pruneExpiredStorage(): void {
        const values = [];
        const keys = Object.keys(localStorage);
        let i = keys.length;

        while (i--) {
            values.push({
                key: keys[i],
                data: this.localStorage.getItem(keys[i])
            });
        }

        for (let v = 0; v < values.length; v++) {
            let item = values[v];
            if (Date.now() > item.data.expires) {
                this.removeItem(item.key);
            }
        }
    }

    clearStorage(): void {
        this.localStorage.clearSubscribe();
        this.userItem.next(null);
        this.tokenItem$.next(null);
    }

    /**
     * When the user has been logged in, we need to make sure we are appending these to every HTTP call,
     * so that the user can make authorized calls to the server.
     *
     */
    getTokenRequest(request: HttpRequest<any>): HttpRequest<any> {
        if (!this.dataStore || !this.dataStore.token) {
            return request;
        }

        return request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + this.dataStore.token.access_token
            }
        });
    }
}

export interface AuthenticationStorageItems {
    token:ILocalStorage<IToken>,
    user:ILocalStorage<User>
}