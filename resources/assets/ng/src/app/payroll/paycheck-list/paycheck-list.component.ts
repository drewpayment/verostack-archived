import { Component, OnInit, ViewChild } from '@angular/core';
import { IAgent, PayrollDetails, User, Paginator, ICampaign } from '@app/models';
import { PaycheckService } from './paycheck.service';
import { SessionService } from '@app/session.service';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { Moment } from '@app/shared';
import { CampaignService } from '@app/campaigns/campaign.service';
import { PaycheckDetailService } from '../paycheck-detail/paycheck-detail.service';

@Component({
    selector: 'vs-paycheck-list',
    templateUrl: './paycheck-list.component.html',
    styleUrls: ['./paycheck-list.component.scss']
})
export class PaycheckListComponent implements OnInit {

    user:User;
    agents:IAgent[];
    campaigns$ = new BehaviorSubject<ICampaign[]>(null);
    paginator:Paginator<PayrollDetails>;
    paychecks$ = new BehaviorSubject<PayrollDetails[]>(null);
    searchAgentsCtrl:FormControl;
    @ViewChild('paging') paging:MatPaginator;
    @ViewChild(MatSort) sort:MatSort;
    @ViewChild(MatTable) table:MatTable<PayrollDetails[]>;
    startDate:Moment|Date|string;
    endDate:Moment|Date|string;
    hasSetSort:boolean = false;

    constructor(
        private session:SessionService,
        private service:PaycheckService,
        private campaignService:CampaignService,
        private paycheckDetailService:PaycheckDetailService
    ) {
    }

    ngOnInit() {
        this.session.getUserItem().subscribe(user => {
            this.user = user;

            this.campaignService.getCachedCampaigns(user.sessionUser.sessionClient)
                .subscribe(campaigns => {
                    this.campaigns$.next(campaigns);
                    this.getPaychecks();
                });
        });
    }

    sortTable($event) {
        console.dir($event);
    }

    clickPaystub(detail:PayrollDetails) {
        this.paycheckDetailService.navigateToDetail(detail);
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

                let paychecks = this.paginator.data.sort((a, b) => {
                    if(a.agent.lastName < b.agent.lastName)
                        return -1;
                    if(a.agent.lastName > b.agent.lastName)
                        return 1;
                    return 0;
                }).sort((a, b) => {
                    if(a.agent.firstName < b.agent.firstName)
                        return -1;
                    if(a.agent.firstName > b.agent.firstName)
                        return 1;
                    return 0;
                });
                
                paychecks = paychecks.map(p => {
                    p.payroll.campaign = this.campaigns$.value.find(c => c.campaignId == p.payroll.campaignId);
                    return p;
                });

                if(paychecks != null) {
                    this.startDate = paychecks.sort((a,b) => {
                        return <any>(Date.parse(<string>a.payroll.payCycle.startDate) > Date.parse(<string>b.payroll.payCycle.startDate));
                    })[0].payroll.payCycle.startDate;

                    this.endDate = paychecks.sort((a,b) => {
                        return <any>(Date.parse(<string>a.payroll.payCycle.endDate) < Date.parse(<string>b.payroll.payCycle.endDate));
                    })[0].payroll.payCycle.endDate;
                }
                
                this.paychecks$.next(paychecks);
            });
    }
}
