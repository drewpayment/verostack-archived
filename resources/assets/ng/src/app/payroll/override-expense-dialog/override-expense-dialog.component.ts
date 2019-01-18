import {Component, OnInit, Inject} from '@angular/core';
import { PayrollDetails, IAgent } from '@app/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

interface DialogData {
    detail:PayrollDetails,
    agents:IAgent[]
}

@Component({
    selector: 'vs-override-expense-dialog',
    templateUrl: './override-expense-dialog.component.html',
    styleUrls: ['./override-expense-dialog.component.scss']
})
export class OverrideExpenseDialogComponent implements OnInit {

    detail:PayrollDetails;
    agents:IAgent[];
    f:FormGroup = this.createForm();

    constructor(
        private ref:MatDialogRef<OverrideExpenseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data:DialogData,
        private fb:FormBuilder
    ) {
        this.detail = this.data.detail || {} as PayrollDetails;
        this.agents = this.data.agents || [];
    }

    ngOnInit() {
        if(this.detail != null) this.buildFormArrays();
    }

    get overrides():FormArray {
        return this.f.controls.overrides.value;
    }

    private buildFormArrays() {
        this.createOverridesFormArray();
        this.createExpensesFormArray();
    }

    private createForm():FormGroup {
        return this.fb.group({
            overrides: this.fb.array([]),
            expenses: this.fb.array([])
        });
    }

    private createOverridesFormArray() {
        if(this.detail.overrides == null || this.detail.overrides.length == 0) return;
        this.detail.overrides.forEach(o => {
            (<FormArray>this.f.get('overrides')).push(this.fb.group({
                overrideId: this.fb.control(o.overrideId),
                payrollDetailsId: this.fb.control(o.payrollDetailsId),
                agentId: this.fb.control(o.agentId, [Validators.required]),
                units: this.fb.control(o.units, [Validators.required]),
                amount: this.fb.control(o.amount, [Validators.required])
            }));
        });
    }

    private createExpensesFormArray() {
        if(this.detail.expenses == null || this.detail.expenses.length == 0) return;
        this.detail.expenses.forEach(e => {
            (<FormArray>this.f.get('expenses')).push(this.fb.group({
                expenseId: this.fb.control(e.expenseId),
                payrollDetailsId: this.fb.control(e.payrollDetailsId),
                agentId: this.fb.control(e.agentId),
                description: this.fb.control(e.description),
                amount: this.fb.control(e.amount)
            }));
        });
    }

}
