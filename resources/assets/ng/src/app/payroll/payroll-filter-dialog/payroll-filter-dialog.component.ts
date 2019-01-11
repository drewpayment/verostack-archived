import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PayrollFilter } from '@app/models';
import { FormGroup, FormBuilder } from '@angular/forms';

interface DialogData {
    filters:PayrollFilter
}

@Component({
    selector: 'vs-payroll-filter-dialog',
    templateUrl: './payroll-filter-dialog.component.html',
    styleUrls: ['./payroll-filter-dialog.component.scss']
})
export class PayrollFilterDialogComponent implements OnInit {

    f:FormGroup = this.createForm();
    filters:PayrollFilter;

    constructor(
        private ref:MatDialogRef<PayrollFilterDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data:DialogData,
        private fb:FormBuilder
    ) {
        this.filters = this.data.filters || { activeFilters: [] } as PayrollFilter;
    }

    ngOnInit() {
        this.patchForm();
    }

    onNoClick() {
        this.ref.close();
    }

    private patchForm():void {
        this.f.patchValue({
            agent: this.filters.agentId,
            client: this.filters.clientId,
            weekEnding: this.filters.weekEnding,
            isAutomated: this.filters.isAutomated || false,
            isReleased: this.filters.isReleased || false,
            automatedRelease: this.filters.automatedRelease
        });
    }

    private createForm():FormGroup {
        return this.fb.group({
            agent: this.fb.control(''),
            weekEnding: this.fb.control(''),
            isAutomated: this.fb.control(false),
            isReleased: this.fb.control(false),
            automatedRelease: this.fb.control(''),
            client: this.fb.control('')
        });
    }
}
