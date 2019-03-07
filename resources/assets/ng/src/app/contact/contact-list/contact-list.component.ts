import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from '@app/session.service';
import { ContactService } from '../contact.service';
import { User } from '@app/models';

@Component({
    selector: 'vs-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {

    // have to store the site title on this so that we can reset it after we navigate away from the CRM.
    siteTitle:string;
    user:User;
    
    constructor(
        private session:SessionService,
        private contactService:ContactService
    ) {}

    ngOnInit() {
        this.session.getUserItem().subscribe(user => {
            this.user = user;

            this.siteTitle = this.session.navigationTitle$.getValue();
            this.session.setNavigationTitle('Contact Manager');
        });
    }

    ngOnDestroy() {
        this.session.setNavigationTitle(this.siteTitle);
    }

}
