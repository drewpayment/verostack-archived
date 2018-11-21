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

@Component({
    selector: 'vs-pay-cycle',
    templateUrl: './pay-cycle.component.html',
    styleUrls: ['./pay-cycle.component.scss']
})
export class PayCycleComponent implements OnInit {

    user:User;
    campaigns:ICampaign[];
    cycles:PayCycle[];

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

            this.payCycleService.getPayCycles(this.user.sessionUser.sessionClient)
                .subscribe(cycles => {
                    this.cycles = cycles;
                });
        });
    }

    getCycleStatus(cycle:PayCycle):string {
        let message = '';
        if(!cycle.isPending && !cycle.isClosed) {
            message = 'The payroll has been created, but not started. Get it started now.';
        } else if (cycle.isPending && !cycle.isClosed) {
            message = 'The payroll has been started, but needs to be completed.';
        } else if (cycle.isClosed) {
            message = 'The payroll has been completed. :)';
        }
        return message;
    }

    editPayCycle(cycle:PayCycle):void {
        this.payCycleService.cycle = cycle;
        this.router.navigate(['admin/pay/edit', cycle.payCycleId]);
    }
}
