import { Component, OnInit, ViewChild } from '@angular/core';
import { IAgent, PayrollDetails, User } from '@app/models';
import { PaycheckService } from './paycheck.service';
import { SessionService } from '@app/session.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'vs-paycheck-list',
    templateUrl: './paycheck-list.component.html',
    styleUrls: ['./paycheck-list.component.scss']
})
export class PaycheckListComponent implements OnInit {

    user:User;
    agents:IAgent[];
    paychecks:PayrollDetails[];
    searchAgentsCtrl:FormControl;

    constructor(
        private session:SessionService,
        private service:PaycheckService
    ) {}

    ngOnInit() {
        this.session.getUserItem().subscribe(user => {
            this.user = user;
            this.service.getPaychecks(user.sessionUser.sessionClient, 4, 1)
                .subscribe(paychecks => console.dir(paychecks));
        });
    }
}
