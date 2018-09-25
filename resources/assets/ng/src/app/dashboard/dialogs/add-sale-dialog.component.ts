import { Component, OnInit, Inject } from "@angular/core";
import { IAgent, ICampaign, DailySale, IUser, SaleStatus, PaidStatusType } from "@app/models";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as moment from 'moment';
import { IState, States } from "@app/shared/models/state.model";

interface DialogData {
    user:IUser,
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
    user:IUser;
    form:FormGroup;
    agent:IAgent;
    campaigns:ICampaign[];
    statuses:SaleStatus[];
    submitted:boolean;
    states:IState[] = States.$get();

    constructor(
        public ref:MatDialogRef<AgentAddSaleDialog>,
        @Inject(MAT_DIALOG_DATA) public data:DialogData,
        private fb:FormBuilder
    ) {}

    ngOnInit() {
        this.agent = this.data.agent || {} as IAgent;
        this.campaigns = this.data.campaigns || [];
        this.user = this.data.user || {} as IUser;
        this.statuses = this.data.statuses || [];

        this.createForm();
    }

    saveAgentSale():void {
        console.log('SOLD!');
    }

    onNoClick() {
        this.ref.close();
    }

    private createForm():void { 
        this.form = this.fb.group({
            saleDate: this.fb.control(moment(), [Validators.required]),
            agentId: this.fb.control(this.agent.agentId, [Validators.required]),
            campaignId: this.fb.control({value:'', disabled: this.campaigns.length < 2}, [Validators.required]),
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
        return {
            dailySaleId: null,
            agentId: this.form.value.agentId,
            campaignId: this.form.value.campaignId,
            clientId: this.user.selectedClient.clientId,
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
            street: this.form.value.street,
            street2: this.form.value.street2,
            city: this.form.value.city,
            state: this.form.value.state,
            zip: this.form.value.zip,
            status: -1,
            paidStatus: PaidStatusType.unpaid,
            podAccount: this.form.value.podAccount,
            remarks: [],
            saleDate: this.form.value.saleDate
        }
    }
}