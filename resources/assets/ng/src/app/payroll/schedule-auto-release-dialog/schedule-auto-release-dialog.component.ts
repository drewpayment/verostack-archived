import {Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'moment';

interface DialogData {
    date:Moment|Date|string;
}

@Component({
    selector: 'vs-schedule-auto-release-dialog',
    templateUrl: './schedule-auto-release-dialog.component.html',
    styleUrls: ['./schedule-auto-release-dialog.component.scss']
})
export class ScheduleAutoReleaseDialogComponent implements OnInit {

    form:FormGroup = this.createForm();

    constructor(
        private ref:MatDialogRef<ScheduleAutoReleaseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data:DialogData,
        private fb:FormBuilder
    ) {}

    ngOnInit() {
        if(this.data.date)
            this.patchForm();
    }

    onNoClick() {
        this.ref.close();
    }

    updateSelectedDate(event) {
        console.dir(event);
    }

    saveAutoReleaseForm() {
        if(this.form.invalid) return;

        this.ref.close(this.form.value.releaseDate);
    }

    private createForm() {
        return this.fb.group({
            releaseDate: this.fb.control('', [Validators.required])
        });
    }

    private patchForm() {
        this.form.patchValue({
            releaseDate: this.data.date
        });
    }

}
