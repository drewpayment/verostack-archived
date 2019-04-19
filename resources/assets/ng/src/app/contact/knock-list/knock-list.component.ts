import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DncContact } from '@app/models';

@Component({
    selector: 'vs-knock-list',
    templateUrl: './knock-list.component.html',
    styleUrls: ['./knock-list.component.scss']
})
export class KnockListComponent implements OnInit {

    contacts:DncContact[];

    constructor(private route:ActivatedRoute) { }

    ngOnInit() {
        this.contacts = this.route.snapshot.data['contacts'];
    }

}
