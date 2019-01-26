import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Payroll } from '@app/models';

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
        console.dir(this.payrolls);

        this.payrolls.forEach(p => p.details.forEach(d => this.grossTotalReleaseAmount += +d.grossTotal));
    }

    confirmRelease() {
        this.ref.close(true);
    }

    onNoClick() {
        this.ref.close();
    }
}
