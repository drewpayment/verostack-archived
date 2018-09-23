import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';

import * as moment from 'moment';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { IUser, IAgent, ICampaign, SaleStatus, DailySale } from '@app/models';
import { SessionService } from '@app/session.service';
import { AgentsService } from '@app/core/agents/agents.service';
import { MatDialog, MatSelectChange } from '@angular/material';
import { AgentAddSaleDialog } from '@app/dashboard/dialogs/add-sale-dialog.component';
import { CampaignService } from '@app/campaigns/campaign.service';
import { ClientService } from '@app/client-information/client.service';
import { DailySaleTrackerService } from '@app/daily-sale-tracker/daily-sale-tracker.service';

interface DataStore {
  agents:IAgent[],
  statuses:SaleStatus[],
  sales:DailySale[]
}

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
  store:DataStore = {} as DataStore;

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
    private campaignService:CampaignService,
    private clientService:ClientService,
    private dailySaleService:DailySaleTrackerService
  ) { }

  ngOnInit() {
    this.selectedAgent = {};
    this.session.getUserItem()
      .subscribe(u => {
        this.user = of(u);

        if (u.role.role > this.roleType.companyAdmin) {
          this.agentService.getAgentsByClient(u.selectedClient.clientId)
            .subscribe(agents => {
              this.store.agents = agents;
              this.agents = of(agents);
              this.selectedAgent = agents[0];
              this.campaigns = this.campaignService.getCampaignsByAgent(u.selectedClient.clientId, this.selectedAgent.agentId);

              this.dailySaleService
                .getDailySalesByAgent(
                  u.selectedClient.clientId,
                  this.selectedAgent.agentId,
                  this.startDate.format('YYYY-MM-DD'),
                  this.endDate.format('YYYY-MM-DD')
                )
                .subscribe(sales => {
                  this.store.sales = sales;

                  this.clientService.getSaleStatuses(u.selectedClient.clientId)
                    .subscribe(statuses => {
                      this.store.statuses = statuses;

                      let chartDate = this.startDate.clone();
                      const header = _.map(statuses, 'name') as string[];
                      let salesData = [];

                      for (let i = 0; i < 7; i++) {
                        var arr = [];
                        if (i === 0) {
                          arr.push(chartDate.format('l'));
                          salesData.push(this.buildChartDataRow(arr, sales, statuses, chartDate));
                          continue;
                        } else if (i === 6) {
                          arr.push(this.endDate.format('l'));
                          salesData.push(this.buildChartDataRow(arr, sales, statuses, this.endDate));
                          continue;
                        }

                        arr.push(chartDate.clone().add(i, 'days').format('l'));
                        salesData.push(this.buildChartDataRow(arr, sales, statuses, chartDate));
                      }

                      this.chartData.dataTable = _.concat([header], salesData);

                      console.dir(this.chartData.dataTable);

                      // this.chartData.dataTable = [
                      //   header,
                      //   [chartDate.format('l'), 2, 0, 0, 1], 
                      //   [chartDate.clone().add(1, 'days').format('l'), 1, 4, 1, 0],
                      //   [chartDate.clone().add(2, 'days').format('l'), 0, 1, 1, 0],
                      //   [chartDate.clone().add(3, 'days').format('l'), 6, 0, 0, 0],
                      //   [chartDate.clone().add(4, 'days').format('l'), 0, 0, 3, 0],
                      //   [chartDate.clone().add(5, 'days').format('l'), 1, 2, 2, 4],
                      //   [this.endDate.format('l'), 11, 0, 0, 0]
                      // ];
                    });
                })
            });
        }

        

        
      });

    const today = moment();
    this.startDate = today.clone().subtract(7, 'days');
    this.endDate = today.clone();

    
  }

  private buildChartDataRow(row:any[], sales:DailySale[], statuses:SaleStatus[], date:Moment):any[] {
    for(let i = 0; i < statuses.length; i++) {
      let currStatus = statuses[i];
      var filteredSales = _.filter(sales, (s:DailySale) => {
        return s.status == currStatus.saleStatusId
          && moment(s.saleDate).diff(date, 'days') == 0;
      });
      row.push(filteredSales.length);
    }
    return row;
  }

  updateDashboard():void { 

  }

  handleAgentChange(event:MatSelectChange):void {
    this.selectedAgent = _.find(this.store.agents, { 'agentId': event.value });
    this.updateDashboard();
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
