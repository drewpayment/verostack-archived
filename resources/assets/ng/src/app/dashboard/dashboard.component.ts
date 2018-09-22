import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';

import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { IUser, IAgent, ICampaign } from '@app/models';
import { SessionService } from '@app/session.service';
import { AgentsService } from '@app/core/agents/agents.service';
import { MatDialog } from '@angular/material';
import { AgentAddSaleDialog } from '@app/dashboard/dialogs/add-sale-dialog.component';
import { CampaignService } from '@app/campaigns/campaign.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  roleType = {
    systemAdmin: 7,
    companyAdmin: 6,
    humanResources: 5,
    regManager: 4,
    manager: 3,
    supervisor: 2,
    user: 1
  }
  user:Observable<IUser>;
  startDate:Moment;
  endDate:Moment;
  selectedAgent:IAgent;
  agents:Observable<IAgent[]>;
  campaigns:Observable<ICampaign[]>;

  messages:any[];

  chartData = {
    chartType: 'ColumnChart',
    dataTable: [],
    options: {
      legend: { position: 'top', maxLines: 3 },
      bar: { groupWidth: '75%' },
      isStacked: true
    }
  };

  constructor(
    private session:SessionService,
    private agentService:AgentsService,
    private dialog:MatDialog,
    private campaignService:CampaignService
  ) { }

  ngOnInit() {
    this.selectedAgent = {};
    this.session.getUserItem()
      .subscribe(u => {
        this.user = of(u);

        if (u.role.role > this.roleType.companyAdmin) {
          this.agentService.getAgentsByClient(u.selectedClient.clientId)
            .subscribe(agents => {
              this.agents = of(agents);
              this.selectedAgent = agents[0];
              this.campaigns = this.campaignService.getCampaignsByAgent(u.selectedClient.clientId, this.selectedAgent.agentId);
            });
        }
      });

    const today = moment();
    this.startDate = today.clone().subtract(7, 'days');
    this.endDate = today.clone();

    let chartDate = this.startDate.clone();
    this.chartData.dataTable = [
      ['Status', 'Accepted', 'Rejected', 'Pending', 'Chargeback'],
      [chartDate.format('l'), 2, 0, 0, 1], 
      [chartDate.clone().add(1, 'days').format('l'), 1, 4, 1, 0],
      [chartDate.clone().add(2, 'days').format('l'), 0, 1, 1, 0],
      [chartDate.clone().add(3, 'days').format('l'), 6, 0, 0, 0],
      [chartDate.clone().add(4, 'days').format('l'), 0, 0, 3, 0],
      [chartDate.clone().add(5, 'days').format('l'), 1, 2, 2, 4],
      [this.endDate.format('l'), 11, 0, 0, 0]
    ];
  }

  updateDashboard():void { 

  }

  showAddSaleDialog():void {
    this.dialog.open(AgentAddSaleDialog, {
      width: '500px',
      data: {
        agent: this.selectedAgent
      }
    })
    .afterClosed()
    .subscribe(result => {
      if(result == null) return;

      console.dir(result);
    });
  }

}
