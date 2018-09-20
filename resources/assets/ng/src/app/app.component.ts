import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';
import { MatSidenav } from '@angular/material';
import { UserService } from './user-features/user.service';
import { Router } from '@angular/router';
import { environment } from '@env/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'app';
  // loading:boolean = true;
  loggedInStatus:Observable<boolean>;
  loading:Observable<boolean>;

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(
    private session: SessionService,
    private cd:ChangeDetectorRef
  ) {
    this.loggedInStatus = this.session.isLoginSubject.asObservable();
    this.loading = this.session.loading$.asObservable();
    this.session.loadUserStorageItem();
  }

  ngOnInit() {

    // exposes the app's sidenav for use by the header
    this.session.setSidenav(this.sidenav);
  }

  ngAfterViewChecked() {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    // this.loading = this.session.loadingState;

    // dev only bug -
    // https://stackoverflow.com/questions/39787038/how-to-manage-angular2-expression-has-changed-after-it-was-checked-exception-w
    if (!environment.production) this.cd.detectChanges();
  }
}
