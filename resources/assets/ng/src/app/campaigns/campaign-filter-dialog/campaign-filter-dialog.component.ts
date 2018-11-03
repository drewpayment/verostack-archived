import { Component, OnInit, Inject } from '@angular/core';
import { CampaignFilters, CompOperator } from '@app/models/campaign-filters.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as _ from 'lodash';

interface DialogData {
    filter:CampaignFilters
}

@Component({
    selector: 'app-campaign-filter-dialog',
    templateUrl: './campaign-filter-dialog.component.html',
    styleUrls: ['./campaign-filter-dialog.component.scss']
})
export class CampaignFilterDialogComponent implements OnInit {
    filter:CampaignFilters;
    form:FormGroup;
    showAllStatuses:boolean = true;
    showCompOperator:boolean;
    constructor(
        private fb:FormBuilder, 
        @Inject(MAT_DIALOG_DATA) public data: any, 
        public ref: MatDialogRef<CampaignFilterDialogComponent>,
    ) {}

    ngOnInit() {
        this.filter = _.cloneDeep(this.data.filter);
        this.createForm();

        this.showCompOperator = this.filter.compensation != null;
    }

    onNoClick() {
        this.ref.close();
    }

    saveFilter():void {
        if(this.form.invalid) return;
        this.prepareModel();
        this.ref.close(this.filter);        
    }

    updateCompOperatorForm():void {
        this.showCompOperator = this.form.value.compensation != null;
    }

    changeShowAll(event):void {
        this.showAllStatuses = event.checked;
        
        if(this.showAllStatuses) {
            this.form.controls.active.patchValue(!this.showAllStatuses);
            this.form.controls.active.disable();

            this.form.controls.inactive.patchValue(!this.showAllStatuses);
            this.form.controls.inactive.disable();
        } else {
            this.form.controls.active.enable();
            this.form.controls.inactive.enable();
        }
        
    }

    private createForm() {
        this.showAllStatuses = this.filter.activeStatus == null || this.filter.activeStatus === 'all';
        this.form = this.fb.group({
            active: this.fb.control({ value: this.filter.activeStatus === 'active', disabled: this.showAllStatuses }),
            inactive: this.fb.control({ value: this.filter.activeStatus === 'inactive', disabled: this.showAllStatuses }),
            compensation: this.fb.control(this.filter.compensation || ''),
            compOperator: this.fb.control((this.filter.compOperator || CompOperator.Equals).toString(), [Validators.required]),
            location: this.fb.control(this.filter.location)
        });
    }

    private prepareModel():void {
        if(this.showAllStatuses) {
            this.filter.activeStatus = 'all';
        } else if (this.form.value.active && !this.form.value.inactive) {
            this.filter.activeStatus = 'active';
        } else if (this.form.value.inactive && !this.form.value.active) {
            this.filter.activeStatus = 'inactive';
        } else if (this.form.value.active && this.form.value.inactive) {
            this.filter.activeStatus = 'all';
        }

        this.filter.compensation = this.form.value.compensation;
        this.filter.compOperator = this.form.value.compOperator;
        this.filter.location = this.form.value.location;
    }
}
