import {Component, OnInit, Inject} from '@angular/core';
import {IUser} from '@app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IState, States } from '@app/shared/models/state.model';

interface DialogData {
    user: IUser, // the current logged in user
    agent: IUser, // the agent we are going to be editing
    managers:IUser[] 
}

@Component({
    selector: 'vs-edit-agent-dialog',
    templateUrl: './edit-agent-dialog.component.html',
    styleUrls: ['./edit-agent-dialog.component.scss']
})
export class EditAgentDialogComponent implements OnInit {

    form:FormGroup;
    agent:IUser;
    managers:IUser[];
    states:IState[] = States.$get();

    constructor(
        private fb:FormBuilder, 
        @Inject(MAT_DIALOG_DATA) public data:DialogData,
        public ref:MatDialogRef<EditAgentDialogComponent>
    ) {}

    ngOnInit() {
        this.agent = this.data.agent;
        this.managers = this.data.managers;
        this.managers.unshift({
            id: -1,
            firstName: 'No',
            lastName: 'Manager'
        } as IUser);

        this.createForm();
    }

    onNoClick():void {
        this.ref.close();
    }

    saveAgentChanges():void {
        const updatedAgent = this.prepareModel();
        this.ref.close(updatedAgent);
    }

    /** Creates a form that has separate form groups for the user entity, user_detail entity and the agent entity. */
    private createForm():void {
        this.form = this.fb.group({
            user: this.fb.group({
                firstName: this.fb.control(this.agent.firstName, [Validators.required]),
                lastName: this.fb.control(this.agent.lastName, [Validators.required]),
                username: this.fb.control(this.agent.username, [Validators.required]),
                email: this.fb.control(this.agent.email, [Validators.required, Validators.email]),
                active: this.fb.control(this.agent.active)
            }),
            detail: this.fb.group({
                street: this.fb.control(this.agent.detail.street, [Validators.required]),
                street2: this.fb.control(this.agent.detail.street2),
                city: this.fb.control(this.agent.detail.city, [Validators.required]),
                state: this.fb.control(this.agent.detail.state, [Validators.required]),
                zip: this.fb.control(this.agent.detail.zip, [Validators.required, Validators.pattern('[0-9]+')]),
                ssn: this.fb.control(this.agent.detail.ssn),
                birthDate: this.fb.control(this.agent.detail.birthDate, [Validators.required]),
                phone: this.fb.control(this.agent.detail.phone, [Validators.required, Validators.pattern('[0-9]+')]),
                routing: this.fb.control(this.agent.detail.bankRouting),
                account: this.fb.control(this.agent.detail.bankAccount)
            }),
            agent: this.fb.group({
                manager: this.fb.control(this.agent.agent.managerId, [Validators.required]),
                isManager: this.fb.control(this.agent.agent.isManager),
                active: this.fb.control(this.agent.agent.isActive)
            })
        })
    }

    private prepareModel():IUser {
        return {
            id: this.agent.id,
            firstName: this.form.value.user.firstName,
            lastName: this.form.value.user.lastName,
            email: this.form.value.user.email,
            username: this.form.value.user.username,
            active: this.form.value.user.active,
            detail: {
                userDetailId: this.agent.detail.userDetailId || 0,
                userId: this.agent.detail.userId,
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
                agentId: this.agent.agent.agentId || 0,
                firstName: this.form.value.user.firstName,
                lastName: this.form.value.user.lastName,
                managerId: this.form.value.agent.manager,
                isManager: this.form.value.agent.isManager,
                isActive: this.form.value.agent.active
            }
        }
    }
}
