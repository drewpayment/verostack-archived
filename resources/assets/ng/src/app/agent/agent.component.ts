import {Component, OnInit} from '@angular/core';
import {AgentService} from '@app/agent/agent.service';
import { IAgent, IUser } from '@app/models';
import { Subject, Observable } from 'rxjs';
import { SessionService } from '@app/session.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { AddAgentDialogComponent } from '@app/core/agents/dialogs/add-agent.component';
import { FloatBtnService } from '@app/fab-float-btn/float-btn.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

interface DataStore {
    users:IUser[],
    managers:IUser[]
}

enum AgentDisplay {
    Summary, 
    Detail
}

interface UserView extends IUser {
    display:AgentDisplay
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
    users:Observable<UserView[]>;
    users$:Subject<UserView[]> = new Subject<UserView[]>();
    managers$:Subject<IAgent[]> = new Subject<IAgent[]>();
    floatOpen$:Observable<boolean>;
    form:FormGroup;

    constructor(
        private service:AgentService,
        private session:SessionService,
        private dialog:MatDialog,
        private floatBtnService:FloatBtnService,
        private fb:FormBuilder
    ) {
        this.floatOpen$ = this.floatBtnService.opened$.asObservable();
        this.users = this.users$.asObservable();
    }

    ngOnInit() {
        this.session.showLoader();
        this.session.userItem.subscribe(user => {
            if(user == null || this.user != null) return;
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
            .pipe(map(this.setMoments))
            .subscribe(users => {
                _.remove(users, u => u.agent == null);
                this.store.users = users;
                this.users$.next(users);
                this.setManagers(users);
                this.session.hideLoader();
            });
    }

    private setMoments(users:UserView[]):UserView[] {
        if(!users)
            return users;
        users.forEach(user => {
            if(user.agent == null) return;
            user.agent.createdAt = moment(user.agent.createdAt);
            user.display = AgentDisplay.Summary;
        });
        return users;
    }

    private setManagers(users:IUser[]):void {
        this.store.managers = _.filter(users, user => {
            return user.agent.isManager;
        }) as IAgent[];
        this.managers$.next(this.store.managers);
    }

    replaceCharAt(input:string, start:number, end:number, replaceChar:string) {
        let counter = end - start;
        let calculatedReplacement:string;
        for(let i = 0; i < counter; i++) {
            calculatedReplacement += replaceChar;
        }

        return input.substr(start, end) + calculatedReplacement + input.substr(end, calculatedReplacement.length);
    }

}
