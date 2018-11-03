import { Component, OnInit, Inject } from "@angular/core";
import { IAgent, ICampaign, DailySale, User, SaleStatus, PaidStatusType } from "@app/models";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as moment from 'moment';
import * as _ from 'lodash';
import { IState, States } from "@app/shared/models/state.model";
import { DailySaleTrackerService } from '@app/daily-sale-tracker/daily-sale-tracker.service';
import { MessageService } from '@app/message.service';

interface DialogData {
    user:User,
    agent:IAgent,
    campaigns:ICampaign[],
    statuses:SaleStatus[]
}

@Component({
    selector: 'vs-agent-sale-dialog',
    templateUrl: './add-sale-dialog.component.html',
    styleUrls: ['./add-sale-dialog.component.scss']
})
export class AgentAddSaleDialog implements OnInit {
    user:User;
    form:FormGroup;
    agent:IAgent;
    campaigns:ICampaign[];
    statuses:SaleStatus[];
    submitted:boolean;
    states:IState[] = States.$get();

    constructor(
        public ref:MatDialogRef<AgentAddSaleDialog>,
        @Inject(MAT_DIALOG_DATA) public data:DialogData,
        private fb:FormBuilder,
        private dailySaleService:DailySaleTrackerService
    ) {}

    ngOnInit() {
        this.agent = this.data.agent || {} as IAgent;
        this.campaigns = this.data.campaigns || [];
        this.user = this.data.user || {} as User;
        this.statuses = this.data.statuses || [];

        this.createForm();
    }

    saveAgentSale():void {
        this.submitted = true;

        if (this.form.invalid) return;

        this.ref.close(this.prepareModel());
    }

    onNoClick() {
        this.ref.close();
    }

    checkUniqueAccount():void { 
        const account = this.form.value.podAccount;
        if(account == null || account.length < 1) return;
        this.dailySaleService.checkUniquePodAccount(account)
            .subscribe((unique:boolean) => {
                if(!unique)
                    this.form.controls.podAccount.setErrors({ 'notUnique': true });
            }); 
    }

    private createForm():void { 
        this.form = new FormGroup({
            saleDate: this.fb.control(moment().format('YYYY-MM-DD'), [Validators.required]),
            agentId: this.fb.control(this.agent.agentId, [Validators.required]),
            campaignId: this.fb.control({value:this.campaigns[0].campaignId, disabled: this.campaigns.length < 2}, [Validators.required]),
            podAccount: this.fb.control('', [Validators.required]),
            firstName: this.fb.control('', [Validators.required]),
            lastName: this.fb.control('', [Validators.required]),
            street: this.fb.control('', [Validators.required]),
            street2: this.fb.control(''),
            city: this.fb.control('', [Validators.required]),
            state: this.fb.control('', [Validators.required]),
            zip: this.fb.control('', [Validators.required])
        });
    }

    private prepareModel():DailySale {
        let pendingStatusQuery = _.find(this.statuses, (s:SaleStatus) => {
            return s.name.toLowerCase() == 'pending';
        }).saleStatusId;
        return {
            dailySaleId: null,
            agentId: this.form.value.agentId,
            campaignId: this.form.value.campaignId,
            clientId: this.user.sessionUser.sessionClient,
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
            street: this.form.value.street,
            street2: this.form.value.street2,
            city: this.form.value.city,
            state: this.form.value.state,
            zip: this.form.value.zip,
            status: pendingStatusQuery || -1,
            paidStatus: PaidStatusType.unpaid,
            podAccount: this.form.value.podAccount,
            remarks: [],
            saleDate: this.form.value.saleDate
        }
    }
}