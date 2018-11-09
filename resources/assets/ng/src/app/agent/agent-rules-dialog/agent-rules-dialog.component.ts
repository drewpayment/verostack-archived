import {Component, OnInit, Inject} from '@angular/core';
import { IAgent, User } from '@app/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IRole, Role, RoleType, IRoleType } from '@app/models/role.model';
import { AgentService } from '@app/agent/agent.service';

interface DialogData {
    user:User
}

@Component({
    selector: 'vs-agent-rules-dialog',
    templateUrl: './agent-rules-dialog.component.html',
    styleUrls: ['./agent-rules-dialog.component.scss']
})
export class AgentRulesDialogComponent implements OnInit {
    roleType:IRoleType = Role;
    form:FormGroup;
    user:User;
    roles:RoleType[];
    hideSalesAdminField:boolean = true;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data:DialogData, 
        public ref:MatDialogRef<AgentRulesDialogComponent>,
        private fb:FormBuilder,
        private agentService:AgentService
    ) {}

    ngOnInit() {
        this.user = this.data.user;

        this.getDisabledStatus();

        this.createForm();
        this.agentService.getRoleTypes()
            .subscribe(roles => {
                roles.forEach((r, i, a) => {
                    r.type = r.type.charAt(0).toUpperCase() + r.type.substring(1, r.type.length);
                    a[i] = r;
                });
                this.roles = roles;
            });
    }

    getDisabledStatus():void {
        this.hideSalesAdminField = this.user.role.role >= this.roleType.companyAdmin;        
    }

    onNoClick():void {
        this.ref.close();
    }

    saveForm():void { 
        if(this.form.invalid) return;
        const dto = this.prepareModel();
        this.ref.close(dto.role);
    }

    private prepareModel():User {
        let user = this.user;
        user.role.role = this.form.value.role;
        user.role.isSalesAdmin = this.form.value.isSalesAdmin;
        user.role.userId = user.role.userId || this.user.id;
        return user;
    }

    private createForm():void {
        this.user.role = this.user.role || {} as IRole;

        this.form = this.fb.group({
            role: this.fb.control(this.user.role.role || '', [Validators.required]),
            isSalesAdmin: this.fb.control(this.user.role.isSalesAdmin)
        });

        this.form.controls.role.valueChanges.subscribe(() => {
            this.getDisabledStatus();
        });
    }
}
