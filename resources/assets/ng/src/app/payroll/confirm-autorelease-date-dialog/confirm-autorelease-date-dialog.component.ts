import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Moment } from 'moment';

interface DialogData {
    date:Moment|Date|string
}

@Component({
    selector: 'vs-confirm-autorelease-date-dialog',
    templateUrl: './confirm-autorelease-date-dialog.component.html',
    styleUrls: ['./confirm-autorelease-date-dialog.component.scss']
})
export class ConfirmAutoreleaseDateDialogComponent implements OnInit {

    date:Moment|Date|string;

    constructor(
        private ref:MatDialogRef<ConfirmAutoreleaseDateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data:DialogData,
    ) {
        this.date = this.data.date;
    }

    ngOnInit() {}

    onNoClick() {
        this.ref.close();
    }

    confirmDate() {
        this.ref.close(this.date);
    }
}
