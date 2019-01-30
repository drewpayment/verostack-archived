import {Component, OnInit} from '@angular/core';
import {User} from '../models';
import {SessionService} from '@app/session.service';
import {SidenavService} from '@app/sidenav/sidenav.service';
import { Location } from '@angular/common';

@Component({
    selector: 'side-nav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

    roleType = {
        systemAdmin: 7,
        companyAdmin: 6,
        humanResources: 5,
        regManager: 4,
        manager: 3,
        supervisor: 2,
        user: 1
    };

    user: User;
    role: any;
    expandPayrollLinks:boolean = false;

    constructor(
        private session: SessionService, 
        private navService: SidenavService,
        private location:Location
    ) {
        this.session.getUserItem().subscribe(u => (this.user = u));
    }

    ngOnInit() {
        this.expandPayrollLinks = this.location.path(true).includes('admin/pay');
    }

    toggleSidenav(): void {
        this.navService.toggle();
    }
}
