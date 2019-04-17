import { Component, OnInit } from '@angular/core';
import { PayrollService } from '../payroll.service';
import { SessionService } from '@app/session.service';
import { User, Payroll, Paginator, PayrollDetails } from '@app/models';
import { BehaviorSubject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Role } from '@app/models/role.model';
import { PaycheckService } from '../paycheck-list/paycheck.service';
import { map, tap } from 'rxjs/operators';
import { coerceNumberProperty } from '@app/utils';
import { PaycheckDetailService } from '../paycheck-detail/paycheck-detail.service';

@Component({
    selector: 'vs-agent-payroll-view',
    templateUrl: './agent-payroll-view.component.html',
    styleUrls: ['./agent-payroll-view.component.scss']
})
export class AgentPayrollViewComponent implements OnInit {

    isMobile = false;
    user:User;
    paychecks = new BehaviorSubject<PayrollDetails[]>(null);
    paginator:Paginator<PayrollDetails>;

    constructor(
        private breakpoint:BreakpointObserver,
        private session:SessionService, 
        private paycheckService:PaycheckService,
        private router:Router,
        private paycheckDetailService:PaycheckDetailService
    ) {
        this.breakpoint.observe([
            Breakpoints.Handset
        ]).subscribe(result => {
            this.isMobile = result.matches;
        });
    }

    ngOnInit() {
        this.session.getUserItem().subscribe(u => {
            if (u == null) return;
            this.user = u;

            if (this.user.role.role > Role.humanResources) {
                this.router.navigate(['/admin/pay/paycheck-list']);
            }

            this.paycheckService.getAgentPaycheckList(this.user.sessionUser.sessionClient, this.user.agent.agentId)
                .pipe(
                    map(res => {
                        res.data.forEach(d => {
                            d.grossTotal = this.calculateGrossTotal(d);
                        });
                        res.data = res.data.sort((a, b) => {
                            const dateA = <any>new Date(<any>a.releaseDate);
                            const dateB = <any>new Date(<any>b.releaseDate);
                            return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
                        });
                        this.paginator = res;
                        return res.data;
                    })
                )
                .subscribe(paychecks => this.paychecks.next(paychecks));
        });
    }

    viewPaycheck(detail:PayrollDetails) {
        this.paycheckDetailService.navigateToDetail(detail);
    }



    private calculateGrossTotal(detail:PayrollDetails):number {
        
        let amount = coerceNumberProperty(detail.grossTotal);

        // if the user has a commission set on their pairing record, let's override the campaign amount. 
        const pairing = detail.agent.pairings.find(p => p.campaignId == detail.payroll.campaignId);
        if (pairing.commission) {
            amount = coerceNumberProperty(pairing.commission);
            detail.grossTotal = amount;
        }

        let expensesTotal = 0;
        let overridesTotal = 0;

        detail.expenses.forEach(e => expensesTotal += coerceNumberProperty(e.amount));
        detail.overrides.forEach(o => overridesTotal += (coerceNumberProperty(o.amount) * coerceNumberProperty(o.units)));

        return amount + expensesTotal + overridesTotal;
    }
}
