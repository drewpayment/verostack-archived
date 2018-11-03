import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { User } from '../models';
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

  user:User;
  role:any;

  constructor(
    private session:SessionService,
    private navService:SidenavService
  ) {
    this.session.getUserItem().subscribe(u => this.user = u);
  }

  ngOnInit() {
    // this.session.getUserItem().subscribe(u => this.user = u);


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
