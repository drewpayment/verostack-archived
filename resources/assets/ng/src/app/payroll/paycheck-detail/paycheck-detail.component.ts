import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { PayrollDetails, User, IClient, DailySale, IOverride, IExpense } from '@app/models';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { SessionService } from '@app/session.service';
import { DailySaleTrackerService } from '@app/daily-sale-tracker/daily-sale-tracker.service';
import { AgentService } from '@app/agent/agent.service';
import { PaycheckDetailService } from './paycheck-detail.service';
import { environment } from '@env/environment';

@Component({
    selector: 'vs-paycheck-detail',
    templateUrl: './paycheck-detail.component.html',
    styleUrls: ['./paycheck-detail.component.scss']
})
export class PaycheckDetailComponent implements OnInit {

    user:User;
    client:IClient;
    detail$ = new BehaviorSubject<PayrollDetails>(null);

    sales:DailySale[];
    saleColumns = ['no', 'saleDate', 'customerName', 'address', 'commissionable', 'amount'];

    overrides:IOverride[];
    overrideColumns = ['agentName', 'noSales', 'commission', 'total'];

    expenses:IExpense[];
    expenseColumns = ['date', 'title', 'description', 'amount'];

    summary:PayrollDetails[];
    summaryColumns = ['spacer', 'titleColumn', 'total'];

    constructor(
        private route:ActivatedRoute, 
        private session:SessionService, 
        private dailySaleService:DailySaleTrackerService,
        private agentService:AgentService,
        private paycheckDetailService:PaycheckDetailService
    ) {}

    ngOnInit() {
        this.route.data.subscribe(data => {
            const detailData:PayrollDetails = data.data;
            this.detail$.next(data.data);
            this.overrides = detailData.overrides;
            this.expenses = detailData.expenses;
            this.summary = [detailData];

            this.initializeComponent(detailData);
        });
    }

    private initializeComponent(detailData:PayrollDetails) {
        this.session.getUserItem().subscribe(u => {
            this.user = u;
            if (this.user == null) {
                this.user = this.paycheckDetailService.headlessUser;
                this.client = <any>this.user.selectedClient;
            } else {
                this.client = this.user.clients.find(c => c.clientId == this.user.sessionUser.sessionClient);
            }

            forkJoin(
                this.dailySaleService.getPaycheckDetailSales(this.client.clientId, detailData.payroll.payCycleId),
                this.agentService.getSalesPairingsByClient(this.client.clientId)
            ).subscribe(([sales, pairings]) => {
                
                sales.forEach(s => {
                    const pairing = pairings.find(p => p.agentId == s.agentId && s.campaignId == p.campaignId);
                    if (pairing == null || pairing.commission == null) return;
                    s.campaign.compensation = pairing.commission;
                });

                this.sales = sales;
            });
        });
    }
}
