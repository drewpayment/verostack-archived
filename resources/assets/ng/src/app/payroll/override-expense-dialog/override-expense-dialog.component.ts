import {Component, OnInit, Inject, ViewChild, AfterViewInit} from '@angular/core';
import { PayrollDetails, IAgent, IOverride, IExpense } from '@app/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTab } from '@angular/material/tabs';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { coerceNumberProperty } from '@app/utils';
import { CurrencyPipe } from '@angular/common';
import { PayCycle } from '@app/models/pay-cycle.model';

interface DialogData {
    payCycle:PayCycle,
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
    ],
    providers: [CurrencyPipe]
})
export class OverrideExpenseDialogComponent implements OnInit, AfterViewInit {

    payCycle:PayCycle;
    detail:PayrollDetails;
    agents:IAgent[];
    f:FormGroup = this.createForm();

    @ViewChild('overrideTab', { static: true }) overrideTab:MatTab;
    @ViewChild('expenseTab', { static: true }) expenseTab:MatTab;

    constructor(
        private ref:MatDialogRef<OverrideExpenseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data:DialogData,
        private fb:FormBuilder,
        private currencyPipe:CurrencyPipe
    ) {
        this.payCycle = this.data.payCycle;
        this.detail = this.data.detail || {} as PayrollDetails;
        this.agents = this.data.agents || [];
    }

    ngOnInit() {
        if (this.detail != null) this.buildFormArrays();
    }

    ngAfterViewInit() {
        // this.f.valueChanges.subscribe(value => {
        //     this.updateOverrideAmount(value);
        // });
    }

    addAdjustment() {
        if (this.overrideTab.isActive) 
            this.addOverrideFormItem();
        else
            this.addExpenseFormItem();
    }

    getActiveTabTitle() {
        if (this.overrideTab.isActive) {
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
        if (this.detail.overrides[index].overrideId == null || this.detail.overrides[index].overrideId == 0) {
            this.detail.overrides.splice(index, 1);
            (<FormArray>this.f.get('overrides')).removeAt(index);
        }
    }

    removeUnsavedExpense(index:number) {
        if (this.detail.expenses[index].expenseId == null || this.detail.expenses[index].expenseId == 0) {
            this.detail.expenses.splice(index, 1);
            (<FormArray>this.f.get('expenses')).removeAt(index);
        }
    }

    updateOverrideAmount(value:string, index:number) {
        const control = this.f.get(['overrides', index, 'amount']) as FormControl;

        if (isNaN(<any>value.charAt(0))) {
            const val = coerceNumberProperty(value.slice(1, value.length));
            control.setValue(this.currencyPipe.transform(val), { emitEvent: false, emitViewToModelChange: false });
        } else {
            control.setValue(this.currencyPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
        }
    }

    updateExpenseAmount(value:string, index:number) {
        const control = this.f.get(['expenses', index, 'amount']) as FormControl;

        if (isNaN(<any>value.charAt(0))) {
            const val = coerceNumberProperty(value.slice(1, value.length));
            control.setValue(this.currencyPipe.transform(val), { emitEvent: false, emitViewToModelChange: false });
        } else {
            control.setValue(this.currencyPipe.transform(value), { emitEvent: false, emitViewToModelChange: false });
        }
    }

    saveForm() {
        if (!this.f.valid) return;
        const model = this.prepareModel();
        this.ref.close(model);
    }

    private prepareModel() {
        const overridesForm = this.f.get('overrides') as FormArray;
        const expensesForm = this.f.get('expenses') as FormArray;
        const overrides = [] as IOverride[];
        const expenses = [] as IExpense[];

        overridesForm.value.forEach((o:IOverride) => {
            overrides.push({
                overrideId: o.overrideId,
                payrollDetailsId: o.payrollDetailsId,
                agentId: o.agentId,
                amount: o.amount,
                units: o.units
            });
        });

        expensesForm.value.forEach((e:IExpense) => {
            expenses.push({
                expenseId: e.expenseId,
                payrollDetailsId: e.payrollDetailsId,
                agentId: e.agentId,
                amount: e.amount,
                description: e.description,
                expenseDate: e.expenseDate,
                title: e.title
            });
        });

        this.detail.overrides = overrides;
        this.detail.expenses = expenses;

        return this.detail;
    }

    private isNumericKeyPress(key) {
        const numericKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        return numericKeys.includes(key);
    }

    private isNumeric(value:any):boolean {
        return !isNaN(value - parseFloat(value));
    }

    private addOverrideFormItem() {
        const control = this.fb.group({
            overrideId: this.fb.control(''),
            payrollDetailsId: this.fb.control(this.detail.payrollDetailsId),
            agentId: this.fb.control('', [Validators.required]),
            units: this.fb.control('', [Validators.required]),
            amount: this.fb.control('', { validators: Validators.required, updateOn: 'blur' })
        });

        (<FormArray>this.f.get('overrides')).push(control);

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
            amount: this.fb.control('', { validators: Validators.required, updateOn: 'blur' }),
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
        if (this.detail.overrides == null || this.detail.overrides.length == 0) return;
        this.detail.overrides.forEach(o => {
            (<FormArray>this.f.get('overrides')).push(this.fb.group({
                overrideId: this.fb.control(o.overrideId),
                payrollDetailsId: this.fb.control(o.payrollDetailsId),
                agentId: this.fb.control(o.agentId, [Validators.required]),
                units: this.fb.control(o.units, [Validators.required]),
                amount: this.fb.control(o.amount, { validators: Validators.required, updateOn: 'blur' })
            }));
        });
    }

    private createExpensesFormArray() {
        if (this.detail.expenses == null || this.detail.expenses.length == 0) return;
        this.detail.expenses.forEach(e => {
            const control = this.fb.group({
                expenseId: this.fb.control(e.expenseId),
                payrollDetailsId: this.fb.control(e.payrollDetailsId),
                agentId: this.fb.control(e.agentId),
                title: this.fb.control(e.title),
                description: this.fb.control(e.description),
                amount: this.fb.control(e.amount, { validators: Validators.required, updateOn: 'blur' }),
                expenseDate: this.fb.control(e.expenseDate, [Validators.required])
            });

            (<FormArray>this.f.get('expenses')).push(control);
        });
    }

}
