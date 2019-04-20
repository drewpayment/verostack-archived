import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DncContact, User } from '@app/models';
import { SessionService } from '@app/session.service';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'vs-knock-list',
    templateUrl: './knock-list.component.html',
    styleUrls: ['./knock-list.component.scss'],
    animations: [
        trigger('showHideActionBar', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('0.5s', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                animate('0.5s', style({ opacity: 0 }))
            ])
        ]),
    ]
})
export class KnockListComponent implements OnInit, OnDestroy {

    private siteTitle:string;
    user:User;
    contacts = new BehaviorSubject<DncContact[]>(null);
    displayColumns = ['checked', 'name', 'address', 'notes'];
    dataSource:MatTableDataSource<DncContact>;
    
    selection:SelectionModel<DncContact>;
    isFabOpen$ = new BehaviorSubject<boolean>(false);

    constructor(private route:ActivatedRoute, private session:SessionService) { }

    ngOnInit() {
        this.contacts.next(this.route.snapshot.data['contacts']);
        this.dataSource = new MatTableDataSource<DncContact>(this.contacts.getValue());

        this.session.getUserItem().subscribe(user => {
            this.user = user;

            this.siteTitle = this.session.navigationTitle$.getValue();
            this.session.setNavigationTitle('Contact Manager');

            this.selection = new SelectionModel<DncContact>(true, []);
        });
    }

    ngOnDestroy() {
        this.session.setNavigationTitle(this.siteTitle);
    }

    selectAllToggle() {
        this.isAllSelected() ?
            this.selection.clear() : 
            this.dataSource.data.forEach(r => this.selection.select(r));
    }

    checkboxLabel(row?:DncContact) {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        } 
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
    }

    isAllSelected() {
        return this.selection.selected.length === this.dataSource.data.length;
    }

    addDncContact() {
        console.log('Add a do not solicit contact!');
        
    }

}
