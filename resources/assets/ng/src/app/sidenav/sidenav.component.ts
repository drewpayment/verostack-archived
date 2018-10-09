import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { IUser } from '../models';
import { Observable } from 'rxjs';
import { SessionService } from '@app/session.service';
import { SidenavService } from '@app/sidenav/sidenav.service';

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
    private session:SessionService,
    private navService:SidenavService
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
    // this.router.events.subscribe(() => {
    //   this.sidenav.close();
    // });
  }

  toggleSidenav():void {
      this.navService.toggle();
  }

}
