import {Component, OnInit, ViewChild} from '@angular/core';
import { Payroll, User, PayrollFilter, IAgent, ICampaign, PayrollFilterType, PayrollDetails } from '@app/models';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { MessageService } from '@app/message.service';
import { PayrollService } from '../payroll.service';
import { SessionService } from '@app/session.service';
import { MatDialog, MatTable, MatTableDataSource, MatDatepicker, MatDatepickerInputEvent } from '@angular/material';
import { PayrollFilterDialogComponent } from '../payroll-filter-dialog/payroll-filter-dialog.component';
import { Moment, MomentInclusivity } from '@app/shared/moment-extensions';
import * as moment from 'moment';
import { CampaignService } from '@app/campaigns/campaign.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { OverrideExpenseDialogComponent } from '../override-expense-dialog/override-expense-dialog.component';
import { ScheduleAutoReleaseDialogComponent } from '../schedule-auto-release-dialog/schedule-auto-release-dialog.component';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'vs-payroll-list',
    templateUrl: './payroll-list.component.html',
    styleUrls: ['./payroll-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ])
    ]
})
export class PayrollListComponent implements OnInit {

    user:User;
    private _payrolls:Payroll[];
    payrolls$ = new BehaviorSubject<Payroll[]>(null);
    agents:IAgent[];
    campaigns:ICampaign[];
    defaultEndDate:Moment = moment();
    defaultStartDate:Moment = this.defaultEndDate.clone().subtract(7, 'days');
    filters:PayrollFilter = { 
        activeFilters: [],
        startDate: this.defaultStartDate,
        endDate: this.defaultEndDate
    } as PayrollFilter;
    private _isFilterBtnActive = false;
    isFilterBtnActive$ = new BehaviorSubject<boolean>(this._isFilterBtnActive);
    filteredAgent:IAgent;
    displayingResults:string;

    displayColumns = [
        'selected', 'weekending', 'cycleStart', 'cycleEnd', 'isAutomated', 
        'isReleased', 'automatedRelease', 'status'
    ];
    detailColumns = ['agent', 'sales', 'gross', 'taxes', 'net'];
    expandedItem:Payroll;
    initialSelection = [];
    allowMultiSelect = true;
    selection = new SelectionModel<Payroll>(true, []);
    @ViewChild('tableRef') table:MatTable<MatTableDataSource<Payroll>>; 
    disableRelease:boolean = true;

    selectedAutoReleaseDate:Moment;

    constructor(
        private msg:MessageService,
        private service:PayrollService,
        private session:SessionService,
        private campaignService:CampaignService,
        private dialog:MatDialog
    ) {}

    ngOnInit() {
        this.session.getUserItem().subscribe(user => {
            this.user = user;
            this.populateCampaigns();
            this.initializeComponent();
        });

        this.selection.onChange.subscribe(() => this.disableRelease = this.selection.selected.length == 0);
    }

    dateChanged(event:MatDatepickerInputEvent<Moment>) {
        console.log('New Release Date: ' + event.value.format('MM-DD-YYYY'));
        this.selectedAutoReleaseDate = event.value;

        console.log('Need to display confirmation dialog and then save the selected payrolls with it if confirmed.');
        /** don't forget to set the "isReleased" boolean on each selected payroll to 'true'. */
    }

    filterBtnClick() {
        this.dialog.open(PayrollFilterDialogComponent, {
                width: '40vw',
                data: {
                    filters: this.filters,
                    agents: this.agents,
                    campaigns: this.campaigns
                }
            })
            .afterClosed()
            .subscribe(result => {
                if(result == null) return;
                this.filters = result;
                this.setActiveFiltersStatus();    
                this.applyFilters();            
            });
    }

    getFilteredAgent(agentId:number):IAgent {
        if(this.agents == null || !this.agents.length) return {};
        return this.agents.find(a => a.agentId == agentId);
    }

    getFilteredCampaign(campaignId:number):ICampaign {
        if(this.campaigns == null || !this.campaigns.length) return {} as ICampaign;
        return this.campaigns.find(c => c.campaignId == campaignId);
    }

    populateCampaigns() {
        this.campaignService.getCampaignsByClient(this.user.sessionUser.sessionClient)
            .subscribe(campaigns => this.campaigns = campaigns);
    }

    removeFilter(filterType:PayrollFilterType) {
        this.removeActiveFilter(filterType);
        switch(filterType) {
            case PayrollFilterType.startDate:
                this.filters.startDate = null;
                break;
            case PayrollFilterType.endDate:
                this.filters.endDate = null;
                break;
            case PayrollFilterType.agent:
                this.filters.agentId = null;
                break;
            case PayrollFilterType.campaign:
                this.filters.campaignId = null;
                break;
            case PayrollFilterType.weekEnding:
                this.filters.weekEnding = null;
                break;
            case PayrollFilterType.isAutomated:
                this.filters.isAutomated = null;
                break;
            case PayrollFilterType.isReleased:
                this.filters.isReleased = null;
                break;
            case PayrollFilterType.automatedRelease:
                this.filters.automatedRelease = null;
                break;
            default:
                break;
        }
        this.setActiveFiltersStatus();
    }

    getPayrollStatus(item:Payroll) {
        return item.payCycle.isClosed
            ? 'Closed'
            : item.payCycle.isPending && !item.payCycle.isClosed
                ? 'Pending'
                : 'Open';
    }

    masterToggle():void {
        this.isAllSelected() ?
            this.selection.clear() :
            this._payrolls.forEach(p => this.selection.select(p));
    }

    isAllSelected():boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this._payrolls.length;
        return numSelected === numRows;
    }

    showExpensesAndOverrides(detail:PayrollDetails) {
        this.dialog.open(OverrideExpenseDialogComponent, {
            width: '60vw',
            maxHeight: '80vh',
            data: {
                detail: detail,
                agents: this.agents
            }
        })
        .afterClosed()
        .subscribe(result => {
            if(result == null) return;

            console.dir(result);
        });
    }

    /** not used */
    scheduleAutoRelease() {
        let dates = this.selection.selected.filter(p => p.automatedRelease != null).map(p => p.automatedRelease);
        const selectedDate = this.getLatestDate(dates);
        this.dialog.open(ScheduleAutoReleaseDialogComponent, {
            width: '40vw',
            data: {
                date: selectedDate
            }
        })
        .afterClosed()
        .subscribe(result => {
            if(result == null) return;

            console.dir(result);
        });
    }

    private getLatestDate(dates:(Moment|Date|string)[]) {
        if(!dates.length) return;
        return dates.reduce((a, c, i) => (c > a) && i ? c : a);
    }

    showReleaseConfirm() {
        console.dir(this.selection.selected);
    }

    /**
     * 
     * 
     * @param detail PayrollDetails
     */
    calculateGrossTotal(detail:PayrollDetails):number {
        let expenses:any = detail.expenses.map(e => e.amount);
        expenses = expenses != null && expenses.length
            ? +expenses.reduce((a,c) => a + c)
            : 0;
        let overrides:any = detail.overrides.map(o => (o.units * o.amount));
        overrides = overrides != null && overrides.length
            ? +overrides.reduce((a,c) => a + c)
            : 0;
        const result = +detail.grossTotal + expenses + overrides;
        return result;
    }

    calculateNetTotal(detail:PayrollDetails):number {
        let result = this.calculateGrossTotal(detail);
        result = result - +detail.taxes;
        return result;
    }

    private applyFilters() {
        let filteredPayrolls = [];
        filteredPayrolls = this._payrolls.filter(p => {
            const startDate = moment(this.filters.startDate);
            const endDate = moment(this.filters.endDate);    
            return moment(p.weekEnding).isBetween(startDate, endDate, 'd', MomentInclusivity.includeBoth);
        });
        
        this.filters.activeFilters.forEach(af => {
            filteredPayrolls = this.applyFilterByType(filteredPayrolls, af);
        });

        this.payrolls$.next(filteredPayrolls);

        this.displayingResults = `Displaying ${filteredPayrolls.length} of ${this._payrolls.length} possible results`;
    }

    private applyFilterByType(payrolls:Payroll[], type:PayrollFilterType):Payroll[] {
        let result:Payroll[];
        switch(type) {
            case PayrollFilterType.agent:
                result = payrolls.map((p, i, a) => {
                    const hasDetails = p.details.find(d => d.agentId == this.filters.agentId) != null;
                    if(hasDetails) {
                        p.details = p.details.filter(d => d.agentId == this.filters.agentId);
                        return p;
                    }
                });
                break;
            case PayrollFilterType.campaign: 
                result = payrolls.filter(p => p.campaignId == this.filters.campaignId);
                break;
            case PayrollFilterType.isAutomated:
                result = payrolls.filter(p => p.isAutomated == this.filters.isAutomated);
                break;
            case PayrollFilterType.isReleased:
                result = payrolls.filter(p => p.isReleased == this.filters.isReleased);
                break;
            case PayrollFilterType.automatedRelease:
                result = payrolls.filter(p => moment(p.automatedRelease).isSame(this.filters.automatedRelease, 'days'));
                break;
            case PayrollFilterType.weekEnding:
                result = payrolls.filter(p => moment(p.weekEnding).isSame(this.filters.weekEnding));
                break;
            default:
                result = payrolls;
                break;
        }

        return result.filter(r => r);
    }

    private setActiveFiltersStatus() {
        let setFiltersActive = false;
        
        if(this.filters.activeFilters.length)
            setFiltersActive = true;

        if(this._isFilterBtnActive != setFiltersActive) {
            this._isFilterBtnActive = setFiltersActive;
            this.isFilterBtnActive$.next(this._isFilterBtnActive);
        }
    }

    private removeActiveFilter(type:PayrollFilterType) {
        this.filters.activeFilters.splice(
            this.filters.activeFilters.indexOf(type), 1
        );
        this.setActiveFiltersStatus();
        this.applyFilters();
    }

    private initializeComponent() {
        this.service.getPayrollList(this.user.sessionUser.sessionClient, this.user.id)
            .subscribe(payrolls => {
                this._payrolls = payrolls;
                this.applyFilters();

                if(this.agents == null) 
                    this.agents = [];

                this._payrolls.forEach(p => {
                    p.details.forEach(d => {
                        if(d.agent == null) return;
                        if(this.agents.find(a => a.agentId == d.agentId) != null)
                            return;
                        this.agents = this.agents.concat(d.agent);
                    });
                });
            });
    }

    
}
