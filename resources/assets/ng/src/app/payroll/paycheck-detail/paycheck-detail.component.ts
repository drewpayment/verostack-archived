import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { PayrollDetails, User, IClient } from '@app/models';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from '@app/session.service';

@Component({
    selector: 'vs-paycheck-detail',
    templateUrl: './paycheck-detail.component.html',
    styleUrls: ['./paycheck-detail.component.scss']
})
export class PaycheckDetailComponent implements OnInit {

    user:User;
    client:IClient;
    detail$ = new BehaviorSubject<PayrollDetails>(null);

    constructor(private route:ActivatedRoute, private session:SessionService) {
        this.session.getUserItem().subscribe(u => {
            this.user = u;
            this.client = this.user.clients.find(c => c.clientId == this.user.sessionUser.sessionClient);
        });

        this.route.data.subscribe(data => {
            this.detail$.next(data.data);
        });
    }

    ngOnInit() {}
}
