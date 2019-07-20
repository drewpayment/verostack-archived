import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
    selector: 'vs-pay-cycle-tutorial-dialog',
    templateUrl: './pay-cycle-tutorial-dialog.component.html',
    styleUrls: ['./pay-cycle-tutorial-dialog.component.scss']
})
export class PayCycleTutorialDialogComponent implements OnInit {

    constructor(
        public ref: MatDialogRef<PayCycleTutorialDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {}

    onNoClick = () => this.ref.close();

}
