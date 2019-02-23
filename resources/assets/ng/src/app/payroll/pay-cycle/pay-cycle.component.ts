import {Component, OnInit} from '@angular/core';
import { User, ICampaign, DailySale, PayrollDetails, Payroll } from '@app/models';
import { SessionService } from '@app/session.service';
import { MatDialog } from '@angular/material';
import { CampaignService } from '@app/campaigns/campaign.service';
import { FormBuilder } from '@angular/forms';
import { MessageService } from '@app/message.service';
import { PayCycle } from '@app/models/pay-cycle.model';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PayCycleDialogComponent } from './components/pay-cycle-dialog/pay-cycle-dialog.component';
import { Moment } from 'moment';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { PayrollService } from '@app/payroll/payroll.service';
import { PayCycleService } from './pay-cycle.service';


@Component({
    selector: 'vs-pay-cycle',
    templateUrl: './pay-cycle.component.html',
    styleUrls: ['./pay-cycle.component.scss']
})
export class PayCycleComponent implements OnInit {

    today:Moment = moment();
    user:User;
    campaigns:ICampaign[];
    private _cycles:PayCycle[];
    displayCycles:BehaviorSubject<PayCycle[]> = new BehaviorSubject<PayCycle[]>([]);
    showClosed:boolean = false;

    constructor(
        private session:SessionService,
        private payCycleService:PayCycleService,
        private payrollService:PayrollService,
        private dialog:MatDialog,
        private campaignService:CampaignService,
        private msg:MessageService,
        private router:Router
    ) {}

    ngOnInit() {
        this.session.showLoader();
        this.session.userItem.subscribe(user => {
            if(user == null || this.user != null) return;
            this.user = user;

            this.campaignService.getCampaignsByClient(this.user.sessionUser.sessionClient)
                .subscribe(campaigns => this.campaigns = campaigns);

            this.payCycleService.getPayCycles(this.user.sessionUser.sessionClient, true)
                .subscribe(cycles => {
                    this._cycles = cycles;
                    this.getActive();

                    this.session.hideLoader();
                });
        });
    }

    addPayCycle() {
        this.dialog.open(PayCycleDialogComponent, {
            width: '50vw'
        })
        .afterClosed()
        .subscribe(result => {
            if(result == null) return;
            this.payCycleService.savePayCycle(this.user.sessionUser.sessionClient, result)
                .subscribe(cycle => {
                    this.msg.addMessage('Successfully created pay cycle!', 'dismiss', 5000);
                    this._cycles.push(cycle);
                    this.displayCycles.next(this._cycles);
                });
        });
    }

    getPayrollEditDate(cycle:PayCycle) {
        return cycle.payrolls[0].updatedAt;
    }

    getBorderColor(cycle:PayCycle, borderDirection:string = 'left') {
        if(this.isPayCycleDue(cycle))
            return `${borderDirection}-border-danger`;
        return cycle != null && cycle.payrolls != null && cycle.payrolls.length > 0 
            ? `${borderDirection}-border-success`
            : `${borderDirection}-border-primary`;
    }

    getButtonColor(cycle:PayCycle) {
        return !(cycle != null && cycle.payrolls != null && cycle.payrolls.length > 0 )
            ? 'primary'
            : '';
    }

    getEditButtonColor(cycle:PayCycle) {
        return cycle != null && cycle.payrolls != null && cycle.payrolls.length > 0
            ? ''
            : 'primary';
    }

    private getActive():void {
        this.displayCycles.next(this._cycles.filter(c => !c.isClosed));
    }

    private getArchived():void {
        this.displayCycles.next(this._cycles.filter(c => c.isClosed));
    }

    getCycleStatus(cycle:PayCycle):string {
        let message = '';

        if(cycle.payrolls != null && cycle.payrolls.length > 0)
            return 'Complete. Ready to release.';

        if(moment(cycle.endDate).isSameOrBefore(moment(), 'day'))
            return 'Due for release.';

        if(!cycle.isPending && !cycle.isClosed) {
            message = 'Get started.';
        } else if (cycle.isPending && !cycle.isClosed) {
            message = 'Pending.';
        } else if (cycle.isClosed) {
            message = 'Closed with no sales.';
        }
        return message;
    }

    isPayCycleDue(cycle:PayCycle):boolean {
        return moment(cycle.endDate).isSameOrBefore(moment(), 'days')
            && (cycle.payrolls == null || cycle.payrolls.length == 0);
    }

    editPayCycle(cycle:PayCycle):void {
        this.payCycleService.cycle = cycle;
        this.router.navigate(['admin/pay/pay-cycles/edit', cycle.payCycleId]);
    }

    closePayCycle(cycle:PayCycle):void {
        this.session.showLoader();

        cycle.isPending = false;
        cycle.isClosed = true;

        this.updatePayCycle(cycle);
    }

    openPayCycle(cycle:PayCycle):void {
        this.session.showLoader();

        cycle.isPending = true;
        cycle.isClosed = false;

        this.updatePayCycle(cycle);
    }

    isBeforeEndDate(cycle:PayCycle):boolean {
        return moment(cycle.endDate).isBefore(this.today);
    }

    /**
     * Begins the workflow of processing payroll. Opens the dialog to allow user to select a "pay date" 
     * and then creates the relationship to the this cycle, calculates total information for users, 
     * and finally closes the cycle.
     * 
     * @param cycle 
     */
    processPayroll(cycle:PayCycle) {
        this.createPayrollsByCampaign(cycle);
    }

    private createPayrollsByCampaign(cycle:PayCycle) {
        this.payCycleService.getPayCycleSales(
            this.user.sessionUser.sessionClient, 
            cycle.startDate as string, 
            cycle.endDate as string, 
            cycle.payCycleId
            ).pipe(
                map(sales => {
                    const campaigns = sales.map(s => s.campaignId).filter((s, i, a) => a.indexOf(s) === i);
                    let payrollResults:Payroll[] = [];
                    
                    campaigns.forEach(c => {
                        let campaign = this.campaigns.find(camp => camp.campaignId === c);
                        let filteredSales = sales.filter(s => s.campaignId == c);
                        let payroll:Payroll = {
                            payrollId: null,
                            payCycleId: cycle.payCycleId,
                            campaignId: c,
                            utilityId: 0,
                            weekEnding: cycle.endDate,
                            isAutomated: false,
                            isReleased: false,
                            details: <PayrollDetails[]>[]
                        };
                        
                        const uniqueAgents = filteredSales.map(fs => fs.agentId).filter((fs, i, a) => a.indexOf(fs) === i);
                        
                        uniqueAgents.forEach(ua => {
                            const agentSales = filteredSales.filter(fs => fs.agentId == ua);
                            const grossTotal = agentSales.length * (campaign.compensation || 0);
                            /** 
                             * how do we figure this out? this might need to be a server side calc if 
                             * the company has "taxes" turned on? 
                             */
                            const taxes = 0;
                            const netTotal = grossTotal - taxes;

                            /** push our payroll detail to the details property on the current payroll we're creating */
                            payroll.details.push({
                                payrollDetailsId: null,
                                payrollId: null,
                                agentId: ua,
                                sales: agentSales.length,
                                grossTotal: grossTotal,
                                taxes: taxes,
                                netTotal: netTotal,
                                modifiedBy: this.user.id,
                                createdAt: moment(),
                                updatedAt: moment()
                            });
                        });

                        payrollResults.push(payroll);
                    });

                    return payrollResults;
                })
            )
            .subscribe(sales => {
                this.payrollService.savePayrollList(this.user.sessionUser.sessionClient, sales)
                    .subscribe(payrolls => {
                        this.msg.addMessage('Successfully process payroll.');
                        
                        if(cycle.payrolls.length)
                            cycle.payrolls.concat(payrolls);
                        else 
                            cycle.payrolls = payrolls;
                    });
            });
    }

    private updatePayCycle(cycle:PayCycle):void {
        this.payCycleService.updatePayCycle(this.user.sessionUser.sessionClient, cycle.payCycleId, cycle)
            .subscribe(payCycle => {
                this.session.hideLoader();
                this._cycles.forEach((c, i, a) => {
                    if(payCycle.payCycleId != c.payCycleId) return;
                    a[i] = payCycle;
                });

                if(this.showClosed)
                    this.getArchived();
                else
                    this.getActive();
            });
    }

    switchDisplay():void {
        this.showClosed = !this.showClosed;
        if(this.showClosed)
            this.getArchived();
        else
            this.getActive();
    }
}
