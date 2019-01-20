import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import { PayrollDetails, IAgent, IOverride } from '@app/models';
import { MatDialogRef, MAT_DIALOG_DATA, MatTab } from '@angular/material';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

interface DialogData {
    detail:PayrollDetails,
    agents:IAgent[]
}

@Component({
    selector: 'vs-override-expense-dialog',
    templateUrl: './override-expense-dialog.component.html',
    styleUrls: ['./override-expense-dialog.component.scss'],
    animations: [
        trigger(
            'enter', [
                transition(':enter', [
                    style({transform: 'translateX(100%)', opacity: 0}),
                    animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
                ]),
                transition(':leave', [
                    style({transform: 'translateX(0)', opacity: 1}),
                    animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
                ])
            ]
        )
    ]
})
export class OverrideExpenseDialogComponent implements OnInit {

    detail:PayrollDetails;
    agents:IAgent[];
    f:FormGroup = this.createForm();

    @ViewChild('overrideTab') overrideTab:MatTab;
    @ViewChild('expenseTab') expenseTab:MatTab;

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

    addAdjustment() {
        if(this.overrideTab.isActive) 
            this.addOverrideFormItem();
        else
            this.addExpenseFormItem();
    }

    getActiveTabTitle() {
        if(this.overrideTab.isActive) {
            return 'Override';
        } else if (this.expenseTab.isActive) {
            return 'Expense';
        }
        return 'Adjustment';
    }

    get overrides():FormArray {
        return this.f.controls.overrides.value;
    }

    onNoClick() {
        this.ref.close();
    }

    removeUnsavedOverride(index:number) {
        if(this.detail.overrides[index].overrideId == null || this.detail.overrides[index].overrideId == 0) {
            this.detail.overrides.splice(index, 1);
            (<FormArray>this.f.get('overrides')).removeAt(index);
        }
    }

    removeUnsavedExpense(index:number) {
        if(this.detail.expenses[index].expenseId == null || this.detail.expenses[index].expenseId == 0) {
            this.detail.expenses.splice(index, 1);
            (<FormArray>this.f.get('expenses')).removeAt(index);
        }
    }

    formatCurrencyOnBlur(element:FormControl, event) {
        let result = event.target.value;
        let i = result.lastIndexOf('.');

        if(i == -1) {
            result = `${result}.00`;
        } else if(result.slice(i).length < 2) {
            let cents = result.slice(i);
            if(cents == 0)
                result = result.slice(0, i) + '00';
            else
                result = result.slice(0, result.length - 1) + '0';
        } else if(result.slice(i).length > 2) {
            let cents = result.slice(i);
            result = result.replace(cents, `.${cents.slice(-2)}`);
        }

        if(result.charAt(0) != '$')
            result = `$${result}`;

        element.patchValue(result);
    }

    saveForm() {
        if(!this.f.valid) return;
        const model = this.prepareModel();
        this.ref.close(model);
    }

    private prepareModel() {
        return {} as PayrollDetails;
    }

    private isNumericKeyPress(key) {
        const numericKeys = [0,1,2,3,4,5,6,7,8,9,0];
        return numericKeys.includes(key);
    }

    private isNumeric(value:any):boolean {
        return !isNaN(value - parseFloat(value));
    }

    private addOverrideFormItem() {
        (<FormArray>this.f.get('overrides')).push(this.fb.group({
            overrideId: this.fb.control(''),
            payrollDetailsId: this.fb.control(this.detail.payrollDetailsId),
            agentId: this.fb.control('', [Validators.required]),
            units: this.fb.control('', [Validators.required]),
            amount: this.fb.control('', [Validators.required])
        }));
        this.detail.overrides.push({
            overrideId: null,
            payrollDetailsId: this.detail.payrollDetailsId,
            agentId: this.detail.agentId,
            units: null,
            amount: null
        });
    }

    private addExpenseFormItem() {
        (<FormArray>this.f.get('expenses')).push(this.fb.group({
            expenseId: this.fb.control(''),
            payrollDetailsId: this.fb.control(this.detail.payrollDetailsId),
            agentId: this.fb.control(this.detail.agentId),
            title: this.fb.control(''),
            description: this.fb.control(''),
            amount: this.fb.control('', [Validators.required]),
            expenseDate: this.fb.control('', [Validators.required])
        }));
        this.detail.expenses.push({
            expenseId: null,
            payrollDetailsId: this.detail.payrollDetailsId,
            agentId: this.detail.agentId,
            title: null,
            description: null,
            amount: null,
            expenseDate: null
        });
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
                title: this.fb.control(e.title),
                description: this.fb.control(e.description),
                amount: this.fb.control(e.amount, [Validators.required]),
                expenseDate: this.fb.control(e.expenseDate, [Validators.required])
            }));
        });
    }

}
