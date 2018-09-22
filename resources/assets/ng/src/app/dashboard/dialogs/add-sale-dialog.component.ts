import { Component, OnInit, Inject } from "@angular/core";
import { IAgent, ICampaign } from "@app/models";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

interface DialogData {
    agent:IAgent,
    campaigns:ICampaign[]
}

@Component({
    selector: 'vs-agent-sale-dialog',
    templateUrl: './add-sale-dialog.component.html',
    styleUrls: ['./add-sale-dialog.component.scss']
})
export class AgentAddSaleDialog implements OnInit {
    agent:IAgent;
    campaigns:ICampaign[];

    constructor(
        public ref:MatDialogRef<AgentAddSaleDialog>,
        @Inject(MAT_DIALOG_DATA) public data:DialogData
    ) {}

    ngOnInit() {
        this.agent = this.data.agent || {} as IAgent;
        this.campaigns = this.data.campaigns || [];
    }
}