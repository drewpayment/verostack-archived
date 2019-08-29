import { Component, OnInit, ViewChild } from '@angular/core';
import { IAgent, PayrollDetails, User, Paginator, ICampaign } from '@app/models';
import { PaycheckService } from './paycheck.service';
import { SessionService } from '@app/session.service';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatPaginator } from '@angular/material/paginator';
import { SortDirection } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Moment } from '@app/shared';
import { CampaignService } from '@app/campaigns/campaign.service';
import { PaycheckDetailService } from '../paycheck-detail/paycheck-detail.service';
import { coerceNumberProperty } from '@app/utils';
import * as moment from 'moment';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, sequence, query, animateChild } from '@angular/animations';


@Component({
    selector: 'vs-paycheck-list',
    templateUrl: './paycheck-list.component.html',
    styleUrls: ['./paycheck-list.component.scss'],
    animations: [
        trigger('slideInOutControls', [
            state('true', style({ transform: 'translateX(0)', opacity: 1 })),
            state('false', style({ transform: 'translateX(100%)', display: 'none', opacity: 0 })),
            transition('false => true', animate(500)),
            transition('true => false', animate(500))
        ]),
        trigger('slideInOutTrigger', [
            state('false', style({ transform: 'translateX(0)', opacity: 1 })),
            state('true', style({ transform: 'translateX(100%)', display: 'none', opacity: 0 })),
            transition('true => false', animate(500)),
            transition('false => true', animate(500))
        ]),
        trigger('slideInOut', [
            state('true', style({})),
            state('false', style({})),
            transition('false => true', [
                sequence([
                    query('@slideInOutTrigger', animateChild()),
                    query('@slideInOutControls', animateChild())
                ])
            ]),
            transition('true => false', [
                sequence([
                    query('@slideInOutControls', animateChild()),
                    query('@slideInOutTrigger', animateChild())
                ])
            ]),
        ])
        
    ]
})
export class PaycheckListComponent implements OnInit {
    user:User;
    campaigns$ = new BehaviorSubject<ICampaign[]>(null);
    paginator:Paginator<PayrollDetails>;
    private _paychecks:PayrollDetails[];
    paychecks$ = new BehaviorSubject<PayrollDetails[]>(null);
    @ViewChild('paging', { static: false }) paging:MatPaginator;
    startDate:Moment|Date|string;
    endDate:Moment|Date|string;
    searchInput = new FormControl('');
    inputs:string[] = [];

    startDateCtrl = new FormControl(moment());
    endDateCtrl = new FormControl(moment());
    pageLoadApiCallHappened = false;


    constructor(
        private route:ActivatedRoute,
        private session:SessionService,
        private service:PaycheckService,
        private campaignService:CampaignService,
        private paycheckDetailService:PaycheckDetailService
    ) {}

    ngOnInit() {
        this.searchInput.valueChanges
            .pipe(
                debounceTime(250),
                distinctUntilChanged()
            ).subscribe(val => this.filterTable(val));

        this.startDateCtrl.valueChanges
            .pipe(tap((value:Moment) => {
                this.service.startDate = value;
            }))
            .subscribe(() => this.getPaychecks());

        this.endDateCtrl.valueChanges
            .pipe(tap((value:Moment) => {
                this.service.endDate = value;
            }))
            .subscribe(() => this.getPaychecks());

        combineLatest(
            this.route.queryParams,
            this.session.getUserItem()
        ).subscribe(([params, user]) => {
            if (this.pageLoadApiCallHappened) return;

            // if the URL has a date param in it, use that (for headless printable stuff), fallback to ng-memory or set to null
            this.startDate = params['startDate'] || this.service.startDate || null;
            this.endDate = params['endDate'] || this.service.endDate || null;

            if (this.startDate) this.startDateCtrl.setValue(this.startDate, {emitEvent: false});
            if (this.endDate) this.endDateCtrl.setValue(this.endDate, { emitEvent: false });

            this.user = user;

            this.campaignService.getCachedCampaigns(user.sessionUser.sessionClient)
                .subscribe(campaigns => {
                    this.campaigns$.next(campaigns);
                    this.getPaychecks();
                });

            this.pageLoadApiCallHappened = true;
        });
    }

    sortTable(sort:{ active:'agentName'|'releaseDate'|'campaign'|'amount', direction:SortDirection }) {
        const result = this.sortPaychecksBy(sort.active, sort.direction);
        this.paychecks$.next(result);
    }

    filterTable(filterValue:string):void {
        if (filterValue == null) {
            this.paychecks$.next(this._paychecks);
            return;
        }
            
        filterValue = filterValue.trim().toLowerCase();

        const paychecks = this._paychecks;
        const firstNameResults = paychecks.filter(p => p.agent.firstName.trim().toLowerCase().indexOf(filterValue) > -1);
        const lastNameResults = paychecks.filter(p => p.agent.lastName.trim().toLowerCase().indexOf(filterValue) > -1);
        const weekEndingResults = paychecks.filter(p => {
            return moment(p.payroll.weekEnding).format('MMM d, YYYY').indexOf(filterValue) > -1;
        });
        const campaignResults = paychecks.filter(p => p.payroll.campaign.name.trim().toLowerCase().indexOf(filterValue) > -1);
        const amountResults = paychecks.filter(p => p.grossTotal.toString().trim().toLowerCase().indexOf(filterValue) > -1);

        let result:PayrollDetails[] = [];
        result = result.concat(firstNameResults, lastNameResults, weekEndingResults, campaignResults, amountResults) as PayrollDetails[];
        result = Array.from(new Set(result.map(r => r.payrollDetailsId)))
            .map(id => {
                return result.find(pd => pd.payrollDetailsId == id);
            });
            
        this.paychecks$.next(result);
    }

    removeInput(input:string):void {
        this.inputs.splice(this.inputs.indexOf(input), 1);
    }

    addInput(event:MatChipInputEvent):void {
        const input = event.input;
        const value = event.value;

        // add our search input
        if ((value || '').trim()) {
            this.inputs.push(value.trim());
            this.filterTable(value.trim());
        }

        // clear our input value
        if (input) {
            input.value = '';
        }
    }

    goToPaycheckDetail(paycheck:PayrollDetails) {
        this.paycheckDetailService.navigateToDetail(paycheck);
    }

    sortPaychecksBy(prop:string, direction:SortDirection):PayrollDetails[] {
        const lessThanType = direction == 'asc' ? -1 : 1;
        const greaterThanType = direction == 'asc' ? 1 : -1;

        if (prop == 'agentName') {
            return this.paychecks$.getValue().sort((a, b) => {
                if (a.agent.lastName < b.agent.lastName)
                    return lessThanType;
                if (a.agent.lastName > b.agent.lastName)
                    return greaterThanType;
                return 0;
            }).sort((a, b) => {
                if (a.agent.firstName < b.agent.firstName)
                    return lessThanType;
                if (a.agent.firstName > b.agent.firstName)
                    return greaterThanType;
                return 0;
            });
        }
        
        if (prop == 'releaseDate') {
            return this.paychecks$.getValue().sort((a, b) => {
                if (Date.parse(<string>a.payroll.releaseDate) < Date.parse(<string>b.payroll.releaseDate))
                    return lessThanType;
                if (Date.parse(<string>a.payroll.releaseDate) > Date.parse(<string>b.payroll.releaseDate))
                    return greaterThanType;
                return 0;
            });
        }

        if (prop == 'campaign') {
            return this.paychecks$.getValue().sort((a, b) => {
                if (a.payroll.campaign.name < b.payroll.campaign.name)
                    return lessThanType;
                if (a.payroll.campaign.name > b.payroll.campaign.name)
                    return greaterThanType;
                return 0;
            });
        }

        if (prop == 'amount') {
            return this.paychecks$.getValue().sort((a, b) => {
                if (a.grossTotal < b.grossTotal) 
                    return lessThanType;
                if (a.grossTotal > b.grossTotal)
                    return greaterThanType;
                return 0;
            });
        }
    }

    clickPaystub(detail:PayrollDetails) {
        this.paycheckDetailService.navigateToDetail(detail);
    }

    getPaychecks(
        page:number = this.paging.pageIndex, 
        pageSize:number = this.paging.pageSize,
        startDate?:Moment|string,
        endDate?:Moment|string
    ):void {
        page++; // we need to increment the value of "page" because matpaginator uses 0-based indexing and laravel pagination starts at 1

        if (!startDate) startDate = this.startDateCtrl.value;
        if (!endDate) endDate = this.endDateCtrl.value;

        this.service.getPaychecks(this.user.sessionUser.sessionClient, page, pageSize, startDate, endDate)
            .subscribe(paginator => {
                this.paginator = paginator;
                this.paging.length = this.paginator.total;

                if (this.paginator.data == null) {
                    this._paychecks = [];
                    this.paychecks$.next(this._paychecks);
                    return; 
                }

                let paychecks = this.paginator.data.sort((a, b) => {
                    if (a.agent.lastName < b.agent.lastName)
                        return -1;
                    if (a.agent.lastName > b.agent.lastName)
                        return 1;
                    return 0;
                }).sort((a, b) => {
                    if (a.agent.firstName < b.agent.firstName)
                        return -1;
                    if (a.agent.firstName > b.agent.firstName)
                        return 1;
                    return 0;
                })
                .sort((a, b) => {
                    const dateA = <any>new Date(<any>a.releaseDate);
                    const dateB = <any>new Date(<any>b.releaseDate);
                    return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
                });
                
                paychecks = paychecks.map(p => {
                    p.payroll.campaign = this.campaigns$.value.find(c => c.campaignId == p.payroll.campaignId);
                    p.grossTotal = this.calculateGrossTotal(p);
                    return p;
                });
                
                this._paychecks = paychecks;
                this.paychecks$.next(paychecks);
            });
    }

    private calculateGrossTotal(detail:PayrollDetails):number {
        const amount = coerceNumberProperty(detail.grossTotal);
        let expensesTotal = 0;
        let overridesTotal = 0;

        detail.expenses.forEach(e => expensesTotal += coerceNumberProperty(e.amount));
        detail.overrides.forEach(o => overridesTotal += (coerceNumberProperty(o.amount) * coerceNumberProperty(o.units)));

        return amount + expensesTotal + overridesTotal;
    }
}
