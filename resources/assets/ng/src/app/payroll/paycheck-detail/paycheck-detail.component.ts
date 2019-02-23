import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { PayrollDetails, User, IClient, DailySale } from '@app/models';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from '@app/session.service';
import { DailySaleTrackerService } from '@app/daily-sale-tracker/daily-sale-tracker.service';

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

    constructor(
        private route:ActivatedRoute, 
        private session:SessionService, 
        private dailySaleService:DailySaleTrackerService
    ){}

    ngOnInit() {
        this.route.data.subscribe(data => {
            const detailData:PayrollDetails = data.data;
            this.detail$.next(data.data);

            this.session.getUserItem().subscribe(u => {
                this.user = u;
                this.client = this.user.clients.find(c => c.clientId == this.user.sessionUser.sessionClient);

                this.dailySaleService.getPaycheckDetailSales(
                    this.user.sessionUser.sessionClient,
                    detailData.payroll.payCycleId
                ).subscribe(sales => {
                    this.sales = sales;
                });
                // this.dailySaleService.getDailySalesByAgent(
                //     this.user.sessionUser.sessionClient, 
                //     detailData.agentId,
                //     <string>detailData.payroll.payCycle.startDate,
                //     <string>detailData.payroll.payCycle.endDate
                // ).subscribe(sales => {
                //     this.sales = sales;
                // });
            });
        });
    }
}
