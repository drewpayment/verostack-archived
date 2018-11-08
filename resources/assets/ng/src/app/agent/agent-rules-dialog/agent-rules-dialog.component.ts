import {Component, OnInit, Inject} from '@angular/core';
import { IAgent, User } from '@app/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

interface DialogData {
    user:User
}

@Component({
    selector: 'vs-agent-rules-dialog',
    templateUrl: './agent-rules-dialog.component.html',
    styleUrls: ['./agent-rules-dialog.component.scss']
})
export class AgentRulesDialogComponent implements OnInit {

    form:FormGroup;
    user:User;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data:DialogData, 
        public ref:MatDialogRef<AgentRulesDialogComponent>,
        private fb:FormBuilder
    ) {}

    ngOnInit() {
        this.user = this.data.user;

        if(this.user)
            this.createForm();
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
        user.role.isSalesAdmin = this.form.value.isSalesAdmin;
        return user;
    }

    private createForm():void {
        this.form = this.fb.group({
            isSalesAdmin: this.fb.control(this.user.role.isSalesAdmin)
        });
    }
}
