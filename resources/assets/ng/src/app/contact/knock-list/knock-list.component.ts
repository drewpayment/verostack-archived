import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DncContact, User } from '@app/models';
import { SessionService } from '@app/session.service';

@Component({
    selector: 'vs-knock-list',
    templateUrl: './knock-list.component.html',
    styleUrls: ['./knock-list.component.scss']
})
export class KnockListComponent implements OnInit, OnDestroy {

    private siteTitle:string;
    user:User;
    contacts:DncContact[];
    displayColumns = ['name', 'address', 'notes'];

    constructor(private route:ActivatedRoute, private session:SessionService) { }

    ngOnInit() {
        this.contacts = this.route.snapshot.data['contacts'];

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
