import {Component, OnInit} from '@angular/core';
import { User, ICampaign } from '@app/models';
import { SessionService } from '@app/session.service';
import { MatDialog } from '@angular/material';
import { FloatBtnService } from '@app/fab-float-btn/float-btn.service';
import { CampaignService } from '@app/campaigns/campaign.service';
import { FormBuilder } from '@angular/forms';
import { MessageService } from '@app/message.service';
import { PayCycleService } from '@app/pay-cycle/pay-cycle.service';
import { PayCycle } from '@app/models/pay-cycle.model';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
    selector: 'vs-pay-cycle',
    templateUrl: './pay-cycle.component.html',
    styleUrls: ['./pay-cycle.component.scss']
})
export class PayCycleComponent implements OnInit {

    user:User;
    campaigns:ICampaign[];
    private _cycles:PayCycle[];
    displayCycles:BehaviorSubject<PayCycle[]> = new BehaviorSubject<PayCycle[]>([]);
    showClosed:boolean = false;

    constructor(
        private session:SessionService,
        private payCycleService:PayCycleService,
        private dialog:MatDialog,
        private campaignService:CampaignService,
        private fb:FormBuilder,
        private msg:MessageService,
        private router:Router
    ) {}

    ngOnInit() {
        this.session.userItem.subscribe(user => {
            if(user == null || this.user != null) return;
            this.user = user;

            this.campaignService.getCampaignsByClient(this.user.sessionUser.sessionClient)
                .subscribe(campaigns => this.campaigns = campaigns);

            this.payCycleService.getPayCycles(this.user.sessionUser.sessionClient, true)
                .subscribe(cycles => {
                    this._cycles = cycles;
                    this.getActive();
                });
        });
    }

    private getActive():void {
        this.displayCycles.next(this._cycles.filter(c => !c.isClosed));
    }

    private getArchived():void {
        this.displayCycles.next(this._cycles.filter(c => c.isClosed));
    }

    getCycleStatus(cycle:PayCycle):string {
        let message = '';
        if(!cycle.isPending && !cycle.isClosed) {
            message = 'The payroll has been created. Get it started now.';
        } else if (cycle.isPending && !cycle.isClosed) {
            message = 'The payroll has been started. Needs to be closed.';
        } else if (cycle.isClosed) {
            message = 'Closed.';
        }
        return message;
    }

    editPayCycle(cycle:PayCycle):void {
        this.payCycleService.cycle = cycle;
        this.router.navigate(['admin/pay/edit', cycle.payCycleId]);
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
