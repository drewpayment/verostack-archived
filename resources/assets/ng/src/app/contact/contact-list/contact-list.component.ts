import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from '@app/session.service';
import { ContactService } from '../contact.service';
import { User } from '@app/models';
import { Contact } from '@app/models/contact.model';

@Component({
    selector: 'vs-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {

    // have to store the site title on this so that we can reset it after we navigate away from the CRM.
    siteTitle:string;
    user:User;
    contacts:Contact[];
    
    constructor(
        private session:SessionService,
        private contactService:ContactService
    ) {}

    ngOnInit() {
        this.session.getUserItem().subscribe(user => {
            this.user = user;

            this.siteTitle = this.session.navigationTitle$.getValue();
            this.session.setNavigationTitle('Contact Manager');

            this.contactService.getContactsByClient(this.user.sessionUser.sessionClient)
                .subscribe(contacts => {
                    this.contacts = contacts;
                });
        });
    }

    ngOnDestroy() {
        this.session.setNavigationTitle(this.siteTitle);
    }

}
