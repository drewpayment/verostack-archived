import {Component, OnInit} from '@angular/core';
import {AgentService} from '@app/agent/agent.service';
import { IAgent, IUser } from '@app/models';
import { Subject, Observable } from 'rxjs';
import { SessionService } from '@app/session.service';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material';
import { AddAgentDialogComponent } from '@app/core/agents/dialogs/add-agent.component';
import { FloatBtnService } from '@app/fab-float-btn/float-btn.service';

interface DataStore {
    agents:IAgent[],
    managers:IAgent[]
}

@Component({
    selector: 'vs-agent',
    templateUrl: './agent.component.html',
    styleUrls: ['./agent.component.scss'],
    providers: [FloatBtnService]
})
export class AgentComponent implements OnInit {
    user:IUser;
    store:DataStore = {} as DataStore;
    agents$:Subject<IAgent[]> = new Subject<IAgent[]>();
    managers$:Subject<IAgent[]> = new Subject<IAgent[]>();
    floatOpen$:Observable<boolean>;

    constructor(
        private service:AgentService,
        private session:SessionService,
        private dialog:MatDialog,
        private floatBtnService:FloatBtnService
    ) {
        this.floatOpen$ = this.floatBtnService.opened$.asObservable();
    }

    ngOnInit() {
        this.session.showLoader();
        this.session.userItem.subscribe(user => {
            if(user == null) return;
            this.user = user;
            this.refreshAgents();
        });
    }

    showAddAgent():void {
        this.floatBtnService.open();

        this.dialog.open(AddAgentDialogComponent, {
            width: '600px',
            data: {
                user: this.user
            }
        })
        .afterClosed()
        .subscribe(result => {
            this.floatBtnService.close();
            if(result == null || !result) return;
            this.refreshAgents();
        });
        
    }

    private refreshAgents():void {
        this.service.getAgentsByClient(this.user.selectedClient.clientId)
            .subscribe(agents => {
                this.store.agents = agents;
                this.agents$.next(agents);
                this.setManagers(agents);
                this.session.hideLoader();
            });
    }

    private setManagers(agents:IAgent[]):void {
        this.store.managers = _.filter(agents, { 'isManager': true }) as IAgent[];
        this.managers$.next(this.store.managers);
    }
}
