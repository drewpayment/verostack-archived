import {Component, OnInit} from '@angular/core';
import { Payroll, User } from '@app/models';
import { Observable, BehaviorSubject } from 'rxjs';
import { MessageService } from '@app/message.service';
import { PayrollService } from '../payroll.service';
import { SessionService } from '@app/session.service';

@Component({
    selector: 'vs-payroll-list',
    templateUrl: './payroll-list.component.html',
    styleUrls: ['./payroll-list.component.scss']
})
export class PayrollListComponent implements OnInit {

    user:User;
    private _payrolls:Payroll[];
    payrolls$ = new BehaviorSubject<Payroll[]>(null);
    isFilterBtnActive:boolean = false;

    constructor(
        private msg:MessageService,
        private service:PayrollService,
        private session:SessionService
    ) {}

    ngOnInit() {
        this.session.getUserItem().subscribe(user => {
            this.user = user;
            this.initializeComponent();
        });
    }

    filterBtnClick() {
        this.isFilterBtnActive = !this.isFilterBtnActive;
    }

    private initializeComponent() {
        this.service.getPayrollList(this.user.sessionUser.sessionClient, this.user.id)
            .subscribe(payrolls => {
                this._payrolls = payrolls;
                this.payrolls$.next(payrolls);
            });
    }
}
