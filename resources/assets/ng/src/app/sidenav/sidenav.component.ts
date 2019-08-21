import {Component, OnInit} from '@angular/core';
import {User} from '../models';
import {SessionService} from '@app/session.service';
import {SidenavService} from '@app/sidenav/sidenav.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserRole } from '@app/models/role.model';

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
    expandPayrollLinks = false;
    expandPeopleLinks = false;
    expandImports = false;

    constructor(
        private session: SessionService, 
        private navService: SidenavService,
        private location:Location,
        private router:Router,
        private route:ActivatedRoute
    ) {
        this.session.getUserItem().subscribe(u => (this.user = u));
    }

    ngOnInit() {
        // this.expandPayrollLinks = this.location.path(true).includes('admin/pay');

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            // we are on the contacts page if this is true
            if (this.location.path(true).includes('contacts')) {
                this.navService.close();
            }
        });
    }

    toggleSidenav(): void {
        this.navService.toggle();
    }

    get hasMyWorkMenuItem(): boolean {
        return this.user && this.user.agent && this.user.role && this.user.role.role < UserRole.companyAdmin
            && this.user.role.role != UserRole.manager && this.user.role.role != UserRole.regionalManager
            && this.user.agent.isActive;
    }
}
