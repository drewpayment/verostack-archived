import { Component, OnInit } from '@angular/core';
import { PayrollService } from '../payroll.service';
import { SessionService } from '@app/session.service';
import { User, Payroll } from '@app/models';
import { BehaviorSubject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Role } from '@app/models/role.model';

@Component({
    selector: 'vs-agent-payroll-view',
    templateUrl: './agent-payroll-view.component.html',
    styleUrls: ['./agent-payroll-view.component.scss']
})
export class AgentPayrollViewComponent implements OnInit {

    isMobile = false;
    user:User;
    payrolls = new BehaviorSubject<Payroll[]>(null);

    constructor(
        private breakpoint:BreakpointObserver,
        private session:SessionService, 
        private payrollService:PayrollService,
        private router:Router
    ) {
        this.breakpoint.observe([
            Breakpoints.Handset
        ]).subscribe(result => {
            this.isMobile = result.matches;
        });
    }

    ngOnInit() {
        this.session.getUserItem().subscribe(u => {
            this.user = u;

            if (this.user.role.role > Role.humanResources) {
                this.router.navigate(['/admin/pay/paycheck-list']);
            }

            
        });
    }
}
