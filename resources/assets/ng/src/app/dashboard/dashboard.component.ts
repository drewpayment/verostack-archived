import { Component, OnInit, ViewChild } from '@angular/core';
import { Moment } from '../shared/moment-extensions';

import * as moment from 'moment';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { IUser, IAgent, ICampaign, SaleStatus, DailySale } from '@app/models';
import { SessionService } from '@app/session.service';
import { AgentsService } from '@app/core/agents/agents.service';
import { MatDialog, MatSelectChange, MatDatepickerInputEvent } from '@angular/material';
import { AgentAddSaleDialog } from '@app/dashboard/dialogs/add-sale-dialog.component';
import { CampaignService } from '@app/campaigns/campaign.service';
import { ClientService } from '@app/client-information/client.service';
import { DailySaleTrackerService } from '@app/daily-sale-tracker/daily-sale-tracker.service';
import { Chart } from 'chart.js';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

interface DataStore {
  user:IUser,
  agents:IAgent[],
  statuses:SaleStatus[],
  sales:DailySale[],
  campaigns:ICampaign[]
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
  chartData:any;
  @ViewChild('chart') private chartRef;
  isMobileLayout:boolean;

  constructor(
    private session:SessionService,
    private agentService:AgentsService,
    private dialog:MatDialog,
    private campaignService:CampaignService,
    private clientService:ClientService,
    private dailySaleService:DailySaleTrackerService,
    private breakpoints:BreakpointObserver
  ) { 
    breakpoints.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      this.isMobileLayout = result.matches;
    });
  }

  ngOnInit() {
    const today = moment();
    this.startDate = today.clone().subtract(1, 'week');
    this.endDate = today.clone().subtract(1, 'days');

    this.selectedAgent = {};
    this.session.getUserItem()
      .subscribe(u => {
        this.store.user = u;
        this.user = of(u);

        if (u.role.role > this.roleType.companyAdmin) {
          this.agentService.getAgentsByClient(u.selectedClient.clientId)
            .subscribe(agents => {
              this.store.agents = agents;
              this.agents = of(agents);
              this.selectedAgent = agents[0];
              this.campaignService.getCampaignsByAgent(u.selectedClient.clientId, this.selectedAgent.agentId)
                .subscribe(campaigns => {
                  this.store.campaigns = campaigns;
                  this.campaigns = of(campaigns);
                });

              this.dailySaleService
                .getDailySalesByAgent(
                  u.selectedClient.clientId,
                  this.selectedAgent.agentId,
                  this.startDate.toDateString(),
                  this.endDate.toDateString()
                )
                .subscribe(sales => {
                  this.store.sales = sales;

                  this.clientService.getSaleStatuses(u.selectedClient.clientId)
                    .subscribe(statuses => {
                      this.store.statuses = statuses;

                      // creates new chartjs object
                      this.createChart(sales);
                    });
                });
            });
        }
      });
  }

  private createChart(sales:DailySale[]):void { 
    let chartDate = this.startDate.clone();
    let labels = [],
      suggestedMax:number = 0;
    const numDays = Math.round(moment.duration(this.endDate.diff(this.startDate)).asDays()) + 1;
    for(let i = 0; i < numDays; i++) {
      let checkDate = i === 0 ? chartDate.clone() : chartDate.clone().add(i, 'days');
      labels.push(checkDate.format('l'));

      let salesCount:number = _.filter(sales, (s:DailySale) => {
        return moment(s.saleDate).isSame(checkDate, 'day');
      }).length;
      if(salesCount > suggestedMax) suggestedMax = salesCount + 3;
    };

    this.chartData = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: this.createSaleDataArray(sales)
      },
      options: {
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ 
            stacked: true,
            beginAtZero: true,
            ticks: {
              suggestedMax: suggestedMax,
              min: 0,
              stepSize: 1
            }
          }]
        }
      }
    });
  }

  private updateChartDatasets(sales:DailySale[]):void {
    this.chartData.config.data.datasets = this.createSaleDataArray(sales);
    const chartDate = this.startDate.clone();
    let labels = [];
    let suggestedMax = 0;
    const numDays = Math.round(moment.duration(this.endDate.diff(this.startDate)).asDays()) + 1;
    for(let i = 0; i < numDays; i++) {
      let checkDate = i === 0 ? chartDate.clone() : chartDate.clone().add(i, 'days');
      labels.push(checkDate.format('l'));

      let salesCount:number = _.filter(sales, (s:DailySale) => {
        return moment(s.saleDate).isSame(checkDate, 'day');
      }).length;
      if(salesCount > suggestedMax) suggestedMax = salesCount + 3;
    };
    
    this.chartData.config.data.labels = labels;
    this.chartData.config.options.scales.yAxes[0].ticks.suggestedMax = suggestedMax;
    this.chartData.chart.update();
  }

  private createSaleDataArray(sales:DailySale[]):any[] {
    let chartDate = this.startDate.clone();
    let salesData = [];

    this.store.statuses.forEach((s:SaleStatus) => {
      let columnData = {
        label: s.name,
        data: [],
        backgroundColor: this.randomColor()
      };

      const numDays = Math.round(moment.duration(this.endDate.diff(this.startDate)).asDays()) + 1;
      // loop through seven days
      for(let i = 0; i < numDays; i++) {
        let checkDate = i === 0 ? chartDate.clone() : chartDate.clone().add(i, 'days');
        let filteredSales = _.filter(sales, (sale:DailySale) => {
          return sale.status == s.saleStatusId
            && moment(sale.saleDate).isSame(checkDate, 'day');
        });
        columnData.data.push({
          x: checkDate.format('l'),
          y: filteredSales.length || 0
        });
      }

      salesData.push(columnData);
    });
    
    return salesData;
  }

  private randomColor():string {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  }

  updateDashboard(event:MatDatepickerInputEvent<Moment> = null, isStart:boolean = true):void { 
    
    if(isStart)
      this.startDate = event.value;
    else
      this.endDate = event.value;

    this.dailySaleService.getDailySalesByAgent(
      this.store.user.id, 
      this.selectedAgent.agentId, 
      this.startDate.toDateString(),
      this.endDate.toDateString()
    ).subscribe(sales => {
      this.updateChartDatasets(sales);
    });
      
  }

  handleAgentChange(event:MatSelectChange):void {
    this.selectedAgent = _.find(this.store.agents, { 'agentId': event.value });
    this.updateDashboard();
  }

  showAddSaleDialog():void {
    this.dialog.open(AgentAddSaleDialog, {
      width: '600px',
      data: {
        user: this.store.user,
        agent: this.selectedAgent,
        campaigns: this.store.campaigns,
        statuses: this.store.statuses
      }
    })
    .afterClosed()
    .subscribe(result => {
      if(result == null) return;

      console.dir(result);
    });
  }

}
