import {Component, OnInit, Inject} from '@angular/core';
import { PayCycle } from '@app/models/pay-cycle.model';
import { SessionService } from '@app/session.service';
import { PayCycleService } from '@app/pay-cycle/pay-cycle.service';
import { User } from '@app/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';

interface DialogData {
    payCycle:PayCycle;
}

@Component({
    selector: 'vs-pay-cycle-dialog',
    templateUrl: './pay-cycle-dialog.component.html',
    styleUrls: ['./pay-cycle-dialog.component.scss']
})
export class PayCycleDialogComponent implements OnInit {
    user:User;
    isNewDialog:boolean = false;

    form:FormGroup = this.createForm();

    /** Used only to figure out the last date to blackout */
    lastPayCycle:PayCycle;
    payCycle:PayCycle;

    minimumDate:Moment|string;

    constructor(
        public ref: MatDialogRef<PayCycleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private session:SessionService, 
        private service:PayCycleService,
        private fb:FormBuilder
    ) {
        this.payCycle = this.data ? this.data.payCycle || null : null;
        this.isNewDialog = this.payCycle == null;
        this.patchForm(this.payCycle || {} as PayCycle);
    }

    ngOnInit() {
        this.session.getUserItem().subscribe(user => {
            this.user = user;

            this.service.getLastPayCycle(user.sessionUser.sessionClient)
                .subscribe(lastCycle => {
                    this.lastPayCycle = lastCycle;
                    if(this.lastPayCycle == null) return;
                    const endDate = moment(this.lastPayCycle.endDate);
                    if(endDate.isValid())
                        this.minimumDate = endDate.add(1, 'd');
                });
        });
    }

    onNoClick() {
        this.ref.close();
    }

    /** save the form */
    saveForm() {
        if(this.form.invalid) return;

        const model = this.prepareModel();

        this.ref.close(model);
    }

    private createForm() {
        const cycle = this.payCycle || {} as PayCycle;
        return this.fb.group({
            startDate: this.fb.control(cycle.startDate || '', [Validators.required]),
            endDate: this.fb.control(cycle.endDate || '', [Validators.required])
        });
    }

    private patchForm(patch:PayCycle) {
        this.form.patchValue({
            startDate: patch.startDate,
            endDate: patch.endDate
        });
    }

    private prepareModel():PayCycle {
        return {
            payCycleId: null,
            startDate: this.form.value.startDate.format('YYYY-MM-DD'),
            endDate: this.form.value.endDate.format('YYYY-MM-DD'),
            isPending: false,
            isClosed: false
        }
    }

}
