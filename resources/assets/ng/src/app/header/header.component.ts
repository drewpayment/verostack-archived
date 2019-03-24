import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {AuthService} from '../auth.service';
import {SessionService} from '../session.service';
import {User} from '../models/user.model';
import {MatDialog, MatToolbar} from '@angular/material';
import {ClientSelectorComponent} from '../client-selector/client-selector.component';
import {Router, NavigationEnd} from '@angular/router';
import {UserService} from '../user-features/user.service';
import { SidenavService } from '@app/sidenav/sidenav.service';
import { UserType } from '@app/models';
import { filter } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
    private defaultTitle = 'Payment Dynamics';

    isLoggedIn: boolean;
    user: User;
    isAdmin: boolean;
    menuTitle = new BehaviorSubject<string>(this.defaultTitle);
    showClientSelector: boolean;
    loggedInStatus:Observable<boolean>;
    navOpen:Observable<boolean>;

    @ViewChild('toolbar') toolbar:MatToolbar;

    isMobile = false;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private session: SessionService,
        private dialog: MatDialog,
        private location:Location,
        private router: Router,
        private sidenavService:SidenavService,
        private breakpointObserver:BreakpointObserver
    ) {
        this.breakpointObserver.observe([
            Breakpoints.Handset
        ]).subscribe(result => {
            this.isMobile = result.matches;
        });
    }

    ngOnInit() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            // we are on the contacts page if this is true
            if (this.location.path(true).includes('contacts')) {
                this.toolbar._elementRef.nativeElement.classList.add('bg-dark');
            } else {
                this.toolbar._elementRef.nativeElement.classList.remove('bg-dark');
            }
        });

        this.session.getUserItem().subscribe(user => {
            if (user == null) return;
            this.user = user;

            this.session.setNavigationTitle(this.userService.getActiveClientName());
            this.menuTitle = this.session.navigationTitle$;

            this.showClientSelector = this.user.clients.length > 1 && this.user.role.role > UserType.HumanResources;
            this.isAdmin = this.user.role.role > UserType.HumanResources;
        });

        this.session.isLoginSubject.subscribe(isAuthenticated => {
            this.loggedInStatus = of(isAuthenticated);
        });

        this.navOpen = this.sidenavService.opened$.asObservable();
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
        const dialogRef = this.dialog.open(ClientSelectorComponent, {
            width: '400px',
            data: this.user
        });

        dialogRef.afterClosed().subscribe(() => {
            // console.log('dialog was closed');
        });
    }
}
