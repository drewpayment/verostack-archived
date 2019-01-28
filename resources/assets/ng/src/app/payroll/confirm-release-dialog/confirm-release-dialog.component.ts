import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Payroll } from '@app/models';
import * as _ from 'lodash';

interface DialogData {
    payrolls:Payroll[]
}

@Component({
    selector: 'vs-confirm-release-dialog',
    templateUrl: './confirm-release-dialog.component.html',
    styleUrls: ['./confirm-release-dialog.component.scss']
})
export class ConfirmReleaseDialogComponent implements OnInit {

    payrolls:Payroll[];
    grossTotalReleaseAmount:number = 0;

    constructor(
        private ref:MatDialogRef<ConfirmReleaseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data:DialogData,
    ) {}

    ngOnInit() {
        this.payrolls = this.data.payrolls || [];
        this.grossTotalReleaseAmount = this.grossTotalReleaseAmount + (_.sumBy(this.payrolls, p => _.sumBy(p.details, d => +d.grossTotal)));
    }

    confirmRelease() {
        this.ref.close(true);
    }

    onNoClick() {
        this.ref.close();
    }
}
