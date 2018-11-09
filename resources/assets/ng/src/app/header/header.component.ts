import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {SessionService} from '../session.service';
import {User} from '../models/user.model';
import {MatSidenav, MatDialog} from '@angular/material';
import {ClientSelectorComponent} from '../client-selector/client-selector.component';
import {Router} from '@angular/router';
import {UserService} from '../user-features/user.service';
import { SidenavService } from '@app/sidenav/sidenav.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
    private defaultTitle: string = 'Payment Dynamics';

    isLoggedIn: boolean;
    user: User;
    isAdmin: boolean;
    menuTitle: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultTitle);
    showClientSelector: boolean;
    loggedInStatus: Observable<boolean>;
    navOpen:Observable<boolean>;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private session: SessionService,
        private dialog: MatDialog,
        private router: Router,
        private sidenavService:SidenavService
    ) {
        this.loggedInStatus = this.session.isLoginSubject.asObservable();
        this.loggedInStatus.subscribe((authenticated: boolean) => {
            if (!authenticated) {
                this.menuTitle.next(this.defaultTitle);
            }
        });
        this.session.userItem.subscribe((next: User) => {
            this.user = next;
            this.menuTitle.next(this.user.sessionUser.client.name);
            this.showClientSelector = this.user.clients.length > 1 && this.user.role.role > 5;
            this.isAdmin = this.user.role.role > 5;
        });
        this.navOpen = this.sidenavService.opened$.asObservable();
    }

    ngOnInit() {
        this.session.getItem('user');
    }

    ngAfterViewInit() {
        // this.sidenav.
    }

    onLogout() {
        this.authService.logout().then((url: string) => {
            this.session.navigateByUrl(url);
        });
    }

    /**
     * Uses session service to toggle side nav
     */
    toggleSidenav(): void {
        this.sidenavService.toggle();
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(ClientSelectorComponent, {
            width: '400px',
            data: this.user
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('dialog was closed');
        });
    }
}
