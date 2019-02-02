import { Component, OnInit, ViewChild } from '@angular/core';
import { IAgent, PayrollDetails, User, Paginator } from '@app/models';
import { PaycheckService } from './paycheck.service';
import { SessionService } from '@app/session.service';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { Moment } from '@app/shared';

@Component({
    selector: 'vs-paycheck-list',
    templateUrl: './paycheck-list.component.html',
    styleUrls: ['./paycheck-list.component.scss']
})
export class PaycheckListComponent implements OnInit {

    user:User;
    agents:IAgent[];
    paginator:Paginator<PayrollDetails>;
    paychecks$ = new BehaviorSubject<PayrollDetails[]>(null);
    searchAgentsCtrl:FormControl;
    @ViewChild('paging') paging:MatPaginator;

    constructor(
        private session:SessionService,
        private service:PaycheckService
    ) {}

    ngOnInit() {
        this.paging.pageSize = 5;

        this.session.getUserItem().subscribe(user => {
            this.user = user;
            this.getPaychecks();
        });

        this.paging.page.subscribe((event:PageEvent) => this.getPaychecks());
    }

    private getPaychecks(
        page:number = this.paging.pageIndex, 
        pageSize:number = this.paging.pageSize,
        startDate?:Moment|string,
        endDate?:Moment|string
    ):void {
        page++; // we need to increment the value of "page" because matpaginator uses 0-based indexing and laravel pagination starts at 1

        this.service.getPaychecks(this.user.sessionUser.sessionClient, page, pageSize, startDate, endDate)
            .subscribe(paginator => {
                this.paginator = paginator;
                this.paging.length = this.paginator.total;

                this.paychecks$.next(this.paginator.data);
            });
    }
}
