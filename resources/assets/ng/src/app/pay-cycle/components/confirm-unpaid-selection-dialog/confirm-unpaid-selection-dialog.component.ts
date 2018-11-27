import {Component, OnInit, Input, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'vs-confirm-unpaid-selection-dialog',
    templateUrl: './confirm-unpaid-selection-dialog.component.html',
    styleUrls: ['./confirm-unpaid-selection-dialog.component.scss']
})
export class ConfirmUnpaidSelectionDialogComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialogRef<ConfirmUnpaidSelectionDialogComponent>
    ) {}

    ngOnInit() {}

    confirmSales() {
        this.dialog.close(this.data.sales);
    }

    cancelDialog() {
        this.dialog.close();
    }
}
