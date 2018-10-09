import { ChartJsContent } from './chart-js-content';

import {Component, OnInit, ViewChild, ViewContainerRef, ContentChild, Renderer2, AfterContentInit, TemplateRef} from '@angular/core';
import {Moment} from '../shared/moment-extensions';

import * as moment from 'moment';
import * as _ from 'lodash';
import {Observable, of, Subject} from 'rxjs';
import {IUser, IAgent, ICampaign, SaleStatus, DailySale, PaidStatusType} from '@app/models';
import {SessionService} from '@app/session.service';
import {AgentsService} from '@app/core/agents/agents.service';
import {MatDialog, MatSelectChange, MatDatepickerInputEvent, MatButtonToggleChange} from '@angular/material';
import {AgentAddSaleDialog} from '@app/dashboard/dialogs/add-sale-dialog.component';
import {CampaignService} from '@app/campaigns/campaign.service';
import {ClientService} from '@app/client-information/client.service';
import {DailySaleTrackerService} from '@app/daily-sale-tracker/daily-sale-tracker.service';
import {Chart} from 'chart.js';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { MessageService } from '@app/message.service';
import { PortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { CdkAccordionItem } from '@angular/cdk/accordion';

interface DataStore {
    user: IUser;
    agents: IAgent[];
    statuses: SaleStatus[];
    sales: DailySale[];
    campaigns: ICampaign[];
}


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterContentInit {
    selectedFilter:PaidStatusType | string = '-1';
    roleType = {
        systemAdmin: 7,
        companyAdmin: 6,
        humanResources: 5,
        regManager: 4,
        manager: 3,
        supervisor: 2,
        user: 1
    };
    user: Observable<IUser>;
    startDate: Moment;
    endDate: Moment;
    selectedAgent: IAgent;
    agents: Observable<IAgent[]>;
    campaigns: Observable<ICampaign[]>;
    store: DataStore = {} as DataStore;
    sales: Observable<DailySale[]>;

    messages: any[];
    chartData:any;
    @ViewChild('chart') chartRef:any;
    @ViewChild('chartTemplate') private chartTemplate:TemplateRef<any>;
    @ViewChild('chartContainer', {read: 'ViewContainerRef'}) private vc:ViewContainerRef;
    isMobileLayout: boolean;
    portal:TemplatePortal;

    constructor(
        private session: SessionService,
        private agentService: AgentsService,
        private dialog: MatDialog,
        private campaignService: CampaignService,
        private clientService: ClientService,
        private dailySaleService: DailySaleTrackerService,
        public breakpoints: BreakpointObserver,
        private msg:MessageService,
        private rend:Renderer2
    ) {
        breakpoints.observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait]).subscribe(result => {
            this.isMobileLayout = result.matches;
        });
    }

    ngOnInit() {
        // we must set the time to 0:00 in order to correctly do calculations, because momentjs 
        // will calculate and round the hours & minutes to the closest day otherwise. 
        const today = moment().hours(0).minutes(0).seconds(0);
        this.startDate = today.clone().subtract(1, 'week');
        this.endDate = today.clone().hours(11);

        this.selectedAgent = {};
        this.session.getUserItem().subscribe(u => {
            this.store.user = u;
            this.user = of(u);

            if (u.role.role > this.roleType.companyAdmin) {
                this.agentService.getAgentsByClient(u.selectedClient.clientId).subscribe(agents => {
                    this.store.agents = agents;
                    this.agents = of(agents);
                    this.selectedAgent = agents[0];
                    this.campaignService
                        .getCampaignsByAgent(u.selectedClient.clientId, this.selectedAgent.agentId)
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
                            this.store.sales = _.orderBy(sales, ['saleDate'], ['desc']);
                            this.sales = of(this.store.sales);

                            this.clientService.getSaleStatuses(u.selectedClient.clientId).subscribe(statuses => {
                                this.store.statuses = statuses;

                                // creates new chartjs object
                                this.createChart(sales);
                            });
                        });
                });
            }
        });

        
    }

    ngAfterContentInit() {
        let chart = this.rend.createElement('canvas');
        chart.innerHTML = chart;

        // this.portal = new TemplatePortal(this.chartRef.nativeElement, this.viewContainerRef, chart);
    }

    addChartElement() {
        
    }

    getStatus(statusId: number): SaleStatus {
        if (statusId == null) return {name: null, clientId: null, saleStatusId: null, isActive: null};
        return (
            _.find(this.store.statuses, {saleStatusId: statusId}) || {
                name: null,
                clientId: null,
                saleStatusId: null,
                isActive: null
            }
        );
    }

    getPaidStatus(paidStatusId: number): string {
        if (paidStatusId == null) return null;
        var result: string;
        switch (paidStatusId) {
            case PaidStatusType.paid:
                result = 'Paid';
                break;
            case PaidStatusType.repaid:
                result = 'Repaid';
                break;
            case PaidStatusType.chargeback:
                result = 'Chargeback';
                break;
            case PaidStatusType.unpaid:
            default:
                result = 'Unpaid';
                break;
        }
        return result;
    }

    isSalePaid(paidStatus: number): boolean {
        if (paidStatus == null) return false;
        return paidStatus == PaidStatusType.paid || paidStatus == PaidStatusType.repaid;
    }

    getBadgeColorFromPaidStatus(payStatus:PaidStatusType):string {
        if(payStatus == PaidStatusType.unpaid) {
            return 'badge-warning';
        } else if(payStatus == PaidStatusType.paid) {
            return 'badge-success';
        } else if(payStatus == PaidStatusType.chargeback) {
            return 'badge-danger';
        } else if(payStatus == PaidStatusType.repaid) {
            return 'badge-success';
        }
    }

    private createChart(sales: DailySale[]): void {
        let chartDate = this.startDate.clone();
        let labels = [],
            suggestedMax: number = 0;

        const numDays = this.calculateDuration();

        for (let i = 0; i <= numDays; i++) {
            let checkDate = chartDate.clone().add(i, 'days');
            labels.push(checkDate.format('l'));

            let salesCount: number = _.filter(sales, (s: DailySale) => {
                return moment(s.saleDate).isSame(checkDate, 'day');
            }).length;
            if (salesCount > suggestedMax) suggestedMax = salesCount + 3;
        }

        this.createNewChart(suggestedMax, labels, sales);
    }

    private createNewChart(suggestedMax: number, labels: string[], sales: DailySale[]): void {
        this.chartData = new Chart(this.chartRef.nativeElement, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: this.createSaleDataArray(sales)
            },
            options: {
                scales: {
                    xAxes: [{stacked: true}],
                    yAxes: [
                        {
                            stacked: true,
                            beginAtZero: true,
                            ticks: {
                                suggestedMax: suggestedMax,
                                min: 0,
                                stepSize: 1
                            }
                        }
                    ]
                }
            }
        });
    }

    private updateAngularChartView() {
        this.vc.detach();
        this.vc.insert(this.chartTemplate.createEmbeddedView(null));
    }

    private updateChartDatasets(sales: DailySale[]): void {
        // TODO: Chart.js Angular bug where the dom element doesn't actually get removed and unable to properly update 
        // the chart.
        this.chartData.clear();
        this.chartData.destroy();

        const chartDate = this.startDate.clone();
        let labels = [];
        let suggestedMax = 0;

        const numDays = this.calculateDuration();

        for (let i = 0; i <= numDays; i++) {
            let checkDate = chartDate.clone().add(i, 'days');
            labels.push(checkDate.format('l'));

            let salesCount: number = _.filter(sales, (s: DailySale) => {
                return moment(s.saleDate).isSame(checkDate, 'day');
            }).length;
            if (salesCount > suggestedMax) suggestedMax = salesCount + 3;
        }

        this.createNewChart(suggestedMax, labels, sales);
    }

    private createSaleDataArray(sales: DailySale[]): any[] {
        let chartDate = this.startDate.clone();
        let salesData = [];

        this.store.statuses.forEach((s: SaleStatus) => {
            let columnData = {
                label: s.name,
                data: [],
                backgroundColor: this.randomColor()
            };

            const numDays = this.calculateDuration();

            // loop through seven days
            for (let i = 0; i <= numDays; i++) {
                let checkDate = chartDate.clone().add(i, 'days');
                let filteredSales = _.filter(sales, (sale: DailySale) => {
                    return sale.status == s.saleStatusId && moment(sale.saleDate).isSame(checkDate, 'day');
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

    /**
     * Custom method to find the duration including the start/end dates to display on the chart.
     * 
     */
    private calculateDuration():number {
        let start:Moment = this.startDate.clone();
        let end:Moment = this.endDate.clone();
        return end.diff(start, 'days');
    }

    private randomColor(): string {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r}, ${g}, ${b}, 0.5)`;
    }

    updateDashboard(event: MatDatepickerInputEvent<Moment> = null, isStart: boolean = true): void {
        
        if (isStart) {
            this.startDate = moment(event.value).hours(0).minutes(0).seconds(0);
        } else {
            this.endDate = moment(event.value).hours(11).minutes(0).seconds(0);
        }

        const startDate:string = (<Moment>this.startDate.clone()).toDateString();
        const endDate:string = (<Moment>this.endDate.clone()).toDateString()

        this.dailySaleService
            .getDailySalesByAgent(
                this.store.user.id,
                this.selectedAgent.agentId,
                startDate,
                endDate
            )
            .subscribe(sales => {
                this.store.sales = _.orderBy(sales, ['saleDate'], ['desc']);
                this.handleFilter();
            });
    }

    handleAgentChange(event: MatSelectChange): void {
        this.selectedAgent = _.find(this.store.agents, {agentId: event.value}) as IAgent;
        this.updateDashboard();
    }

    showAddSaleDialog(): void {
        this.dialog
            .open(AgentAddSaleDialog, {
                width: '600px',
                data: {
                    user: this.store.user,
                    agent: this.selectedAgent,
                    campaigns: this.store.campaigns,
                    statuses: this.store.statuses
                }
            })
            .afterClosed()
            .subscribe((result:DailySale) => {
                if (result == null) return;

                this.dailySaleService
                    .createDailySale(this.store.user.selectedClient.clientId, result)
                    .subscribe(sale => {
                        let existing = _.findIndex(this.store.sales, {dailySaleId: sale.dailySaleId});

                        if (existing == null) {
                            this.store.sales.push(sale);
                            this.store.sales = _.orderBy(this.store.sales, ['saleDate'], ['desc']);
                        } else {
                            this.store.sales[existing] = sale;
                        }

                        this.handleFilter();
                    });
            });
    }

    handleFilter(event:MatButtonToggleChange = null) {
        if(event != null) this.selectedFilter = event.value;

        if(this.selectedFilter == -1) {
            this.updateChartDatasets(this.store.sales);
            this.sales = of(this.store.sales);
        } else {
            let filteredSales = _.filter(this.store.sales, (sale:DailySale) => {
                return sale.paidStatus == this.selectedFilter;
            });

            this.updateChartDatasets(filteredSales);
            this.sales = of(filteredSales);
        }
    }

}


