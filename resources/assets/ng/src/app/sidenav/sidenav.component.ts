import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { IUser, User } from '../models';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../user-features/user.service';
import { MessageService } from '@app/message.service';
import { SessionService } from '@app/session.service';

@Component({
  selector: 'side-nav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() private sidenav: MatSidenav;

  roleType = {
    systemAdmin: 7,
    companyAdmin: 6,
    humanResources: 5,
    regManager: 4,
    manager: 3,
    supervisor: 2,
    user: 1
  }

  user:Observable<IUser>;
  role:any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private msg:MessageService,
    private session:SessionService
  ) {}

  ngOnInit() {
    this.user = this.session.getUserItem();
    // this.userService.user.subscribe((next: IUser) => {
    //   if(next != null) this.user = next;
    // }, err => this.msg.showWebApiError);

    /**
     * Subscribe to router events, so that anytime the user clicks a
     * link in the sidenav, the router event will signal here and we will
     * close the sidenav.
     */
    this.router.events.subscribe(() => {
      this.sidenav.close();
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

}
