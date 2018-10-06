import {Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewChecked, AfterViewInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SessionService} from './session.service';
import {MatSidenav} from '@angular/material';
import {environment} from '@env/environment.prod';
import {MomentExtensions} from '@app/shared/moment-extensions';
import {SidenavService} from '@app/sidenav/sidenav.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
    title = 'app';
    // loading:boolean = true;
    loggedInStatus: Observable<boolean>;
    loading: Observable<boolean>;
    opened$: Observable<boolean>;

    @ViewChild('navigation') public sidenav: MatSidenav;

    constructor(
        private session: SessionService,
        private cd: ChangeDetectorRef,
        private sidenavService: SidenavService
    ) {
        // wire up our extension methods
        MomentExtensions.init();

        this.loggedInStatus = this.session.isLoginSubject.asObservable();
        this.loading = this.session.loading$.asObservable();
    }

    ngOnInit() {
        this.session.loadUserStorageItem();
    }

    ngAfterViewChecked() {
        // initialize our sidenav service
        this.sidenavService.setSidenav(this.sidenav);

        //Called after ngOnInit when the component's or directive's content has been initialized.
        //Add 'implements AfterContentInit' to the class.
        // this.loading = this.session.loadingState;

        // dev only bug -
        // https://stackoverflow.com/questions/39787038/how-to-manage-angular2-expression-has-changed-after-it-was-checked-exception-w
        if (!environment.production) this.cd.detectChanges();
    }
}
