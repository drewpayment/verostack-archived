import {Injectable} from '@angular/core';
import {User} from './models/user.model';
import {Observable, BehaviorSubject, Subject, ReplaySubject, Observer} from 'rxjs';
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

    loading$: Subject<boolean> = new Subject<boolean>();
    loadingState: Observable<boolean>;

    private hasTokenSubject = new ReplaySubject<boolean>(1);
    isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

    previousUrl:string = '';
    currentUrl:string = '';

    private _navigationTitle:string = environment.defaultTitle;
    navigationTitle$ = new BehaviorSubject<string>(this._navigationTitle);

    constructor(
        private localStorage: LocalStorage, 
        private router: Router
    ) {
        // make sure we're removing expired cookies on app boot
        this.pruneExpiredStorage();
        for (let p in this.dataStore) {
            this.getItem(p);
        }

        this.tokenItem = this.tokenItem$.asObservable();
        this.loadingState = this.loading$.asObservable();

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((e:any) => {
            this.previousUrl = this.currentUrl;
            this.currentUrl = e.url;
        });

        this.userItem.pipe(map(u => u.selectedClient = this._selectedClient));
    }

    private _selectedClient():number {
        return this.userItem.getValue().sessionUser.sessionClient;
    }

    setNavigationTitle(value:string) {
        if (typeof value !== 'string' || value == null) return;
        this._navigationTitle = value;
        this.navigationTitle$.next(this._navigationTitle);
    }

    private hasToken(): boolean {
        this.hasTokenSubject.subscribe((hasToken: boolean) => {
            this.userLoggedIn = hasToken;
        });
        this.localStorage
            .getItem('token')
            .toPromise()
            .then((item: ILocalStorage<IToken>) => {
                if (item == null) return;
                if (Date.now() >= item.expires) {
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

    login(token: ILocalStorage<IToken>): void {
        this.setToken(token.data);
        this.setItem('token', token);
        this.hideLoader();
        this.navigateTo('/');
    }

    logout(): void {
        this.clearStorage();
        this.isLoginSubject.next(false);
        this.hasTokenSubject.next(false);
        window.location.href = rootUrl + '/#/login';
    }

    getUserItem():BehaviorSubject<User> {
        return this.userItem;
    }

    get userHomePage() {
        return SessionService.defaultUserUrl;
    }

    /**
     * Updates the app's loading spinner status. It is recommended to use the hide/show methods though.
     *
     * @param loading
     */
    updateLoadingState(loading: boolean): void {
        this.loading$.next(loading);
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

    setToken(token: IToken): void {
        this.isLoginSubject.next(true);
        this.hasTokenSubject.next(true);
        this.dataStore.token = token;
        this.tokenItem$.next(token);
    }

    setItem<T>(itemName: string, data:ILocalStorage<T>): void {
        if (this.dataStore[itemName]) this.dataStore[itemName] = data.data;
        data.expires =
            data.expires == null ? moment().valueOf() + moment.duration(3, 'days').milliseconds() : data.expires;
        this.localStorage.setItemSubscribe(itemName, data);
    }

    getItem(itemName: string): void {
        itemName = itemName.trim().toLowerCase();
        this.localStorage.getItem(itemName).subscribe((next: ILocalStorage<any>) => {
            if (next == null) {
                return;
            } else if (Date.now() >= next.expires) {
                this.hasTokenSubject.next(false);
                this.isLoginSubject.next(false);
                this.removeItem(itemName);
            } else if (itemName === 'user') {
                this.hasTokenSubject.next(true);
                this.isLoginSubject.next(true);
                this.dataStore.user = next.data;
                this.userItem.next(<User>next.data);
            } else if (itemName === 'token') {
                this.hasTokenSubject.next(true);
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
    loadTokenStorageItem(): void {
        this.pruneExpiredStorage();
        this.localStorage.getItem('token').subscribe((item: ILocalStorage<IToken>) => {
            if (item == null) return;

            if (item.expires <= Date.now()) {
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
        return request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + this.dataStore.token.access_token
            }
        });
    }
}
