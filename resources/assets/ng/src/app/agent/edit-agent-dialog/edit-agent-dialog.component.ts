import {Component, OnInit, Inject} from '@angular/core';
import {User, UpdateAgentMetaData} from '@app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IState, States } from '@app/shared/models/state.model';
import { map } from 'rxjs/operators';

interface DialogData {
    user: User, // the current logged in user
    agent: User, // the agent we are going to be editing
    managers:User[] 
}

@Component({
    selector: 'vs-edit-agent-dialog',
    templateUrl: './edit-agent-dialog.component.html',
    styleUrls: ['./edit-agent-dialog.component.scss']
})
export class EditAgentDialogComponent implements OnInit {

    form:FormGroup;
    userAgent:User;
    managers:User[];
    states:IState[] = States.$get();
    userAgentDict:{ [key:string]:any };

    update:UpdateAgentMetaData = {} as UpdateAgentMetaData;

    constructor(
        private fb:FormBuilder, 
        @Inject(MAT_DIALOG_DATA) public data:DialogData,
        public ref:MatDialogRef<EditAgentDialogComponent>
    ) {}

    ngOnInit() {
        this.userAgent = this.data.agent;
        this.managers = this.data.managers;
        this.managers.unshift({
            id: -1,
            firstName: 'No',
            lastName: 'Manager'
        } as User);

        this.createForm();

        this.userAgentDict = this.flattenObject(this.userAgent);
    }

    onNoClick():void {
        this.ref.close();
    }

    saveAgentChanges():void {
        this.update.user = this.getChangedProperties(this.prepareModel());
        this.ref.close(this.update);
    }

    private flattenObject(item:any):any {
        let result = {};

        for (const p in item) {
            if (this.isObject(item[p])) {
                result = Object.assign(result, item[p]);
            } else {
                result[p] = item[p];
            }
        }

        return result;
    }

    private isObject(test:any):boolean {
        const type = typeof test;
        return type === 'function' || type === 'object';
    }

    private getChangedProperties(model:any, key:string = null) {
        const tempModel = key == null ? model : model[key];

        for (const p in tempModel) {

            if (this.isObject(tempModel[p]) && tempModel[p] != null) {
                tempModel[p] = this.getChangedProperties(tempModel[p]);
            } 
        }

        if (key != null) {
            model[key] = tempModel;
        } else {
            model = tempModel;
        }

        if (model) {
            if (model.detail && !this.isEmptyObject(model.detail)) {
                model.detail.userDetailId = this.userAgent.detail.userDetailId;
                if (model.detail.ssn == 0) delete model.detail.ssn;
                this.update.updateDetail = true;
            } else {
                delete model.detail;
            }

            if (model.agent && !this.isEmptyObject(model.agent)) {
                model.agent.agentId = this.userAgent.agent.agentId;
                this.update.updateAgent = true;
            } else {
                delete model.agent;
            }

            this.update.updateUser = true;
        }

        return model;
    }

    private isEmptyObject(obj:any):boolean {
        for (const o in obj) {
            if (obj.hasOwnProperty(o)) {
                return false;
            }
        }
        return true;
    }

    /** Creates a form that has separate form groups for the user entity, user_detail entity and the agent entity. */
    private createForm():void {
        const managerId = this.userAgent.agent.managerId != null 
            ? this.userAgent.agent.managerId
            : -1;
        this.form = this.fb.group({
            user: this.fb.group({
                firstName: this.fb.control(this.userAgent.firstName, [Validators.required]),
                lastName: this.fb.control(this.userAgent.lastName, [Validators.required]),
                username: this.fb.control(this.userAgent.username, [Validators.required]),
                email: this.fb.control(this.userAgent.email, [Validators.required, Validators.email]),
                active: this.fb.control(this.userAgent.active)
            }),
            detail: this.fb.group({
                street: this.fb.control(this.userAgent.detail.street, [Validators.required]),
                street2: this.fb.control(this.userAgent.detail.street2),
                city: this.fb.control(this.userAgent.detail.city, [Validators.required]),
                state: this.fb.control(this.userAgent.detail.state, [Validators.required]),
                zip: this.fb.control(this.userAgent.detail.zip, [Validators.required, Validators.pattern('[0-9]+')]),
                ssn: this.fb.control(this.userAgent.detail.ssn || ''),
                birthDate: this.fb.control(this.userAgent.detail.birthDate, [Validators.required]),
                phone: this.fb.control(this.userAgent.detail.phone, [Validators.required, Validators.pattern('[0-9]+')]),
                routing: this.fb.control(this.userAgent.detail.bankRouting),
                account: this.fb.control(this.userAgent.detail.bankAccount)
            }),
            agent: this.fb.group({
                manager: this.fb.control(managerId),
                isManager: this.fb.control(this.userAgent.agent.isManager),
                active: this.fb.control(this.userAgent.agent.isActive)
            })
        });
    }

    private prepareModel():User {
        return {
            id: this.userAgent.id,
            firstName: this.form.value.user.firstName,
            lastName: this.form.value.user.lastName,
            email: this.form.value.user.email,
            username: this.form.value.user.username,
            active: this.form.value.user.active,
            detail: {
                userDetailId: this.userAgent.detail.userDetailId || 0,
                userId: this.userAgent.detail.userId,
                street: this.form.value.detail.street,
                street2: this.form.value.detail.street2,
                city: this.form.value.detail.city,
                state: this.form.value.detail.state,
                zip: this.form.value.detail.zip,
                ssn: +this.form.value.detail.ssn,
                birthDate: this.form.value.detail.birthDate,
                phone: +this.form.value.detail.phone,
                bankRouting: this.form.value.detail.routing,
                bankAccount: this.form.value.detail.account
            },
            agent: {
                agentId: this.userAgent.agent.agentId || 0,
                firstName: this.form.value.user.firstName,
                lastName: this.form.value.user.lastName,
                managerId: this.form.value.agent.manager,
                isManager: this.form.value.agent.isManager,
                isActive: this.form.value.agent.active
            }
        };
    }
}
