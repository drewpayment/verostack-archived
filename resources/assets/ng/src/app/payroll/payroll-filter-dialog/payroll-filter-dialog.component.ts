import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PayrollFilter, IAgent, PayrollFilterType, ICampaign } from '@app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Moment } from '@app/shared/moment-extensions';
import * as moment from 'moment';

interface DialogData {
    filters:PayrollFilter,
    agents:IAgent[],
    campaigns:ICampaign[]
}

@Component({
    selector: 'vs-payroll-filter-dialog',
    templateUrl: './payroll-filter-dialog.component.html',
    styleUrls: ['./payroll-filter-dialog.component.scss']
})
export class PayrollFilterDialogComponent implements OnInit {

    f:FormGroup = this.createForm();
    filters:PayrollFilter;
    agents:IAgent[];
    campaigns:ICampaign[];
    showReleaseDateFormControl:boolean = false;

    constructor(
        private ref:MatDialogRef<PayrollFilterDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data:DialogData,
        private fb:FormBuilder
    ) {
        this.filters = this.data.filters || { activeFilters: [] } as PayrollFilter;
        this.agents = this.data.agents || [];
        this.campaigns = this.data.campaigns.sort((a, b) => {
            if (a.active && !b.active) 
                return -1;
            if (!a.active && b.active)
                return 1;
            if (a.active == b.active)
                return 0;
        }) || [];
    }

    ngOnInit() {
        this.patchForm();

        this.f.controls.isAutomated.valueChanges.subscribe(value => {
            this.showReleaseDateFormControl = value;

            if (value)
                this.f.controls.automatedRelease.setValidators([Validators.required]);
            else
                this.f.controls.automatedRelease.clearValidators();
        });
    }

    onNoClick() {
        this.ref.close();
    }

    save() {
        // get model
        let model = this.getModel();

        this.ref.close(model);
    }

    private getModel():PayrollFilter {
        const vals = this.f.value;
        return {
            activeFilters: this.setActiveFilters(vals),
            startDate: vals.startDate,
            endDate: vals.endDate,
            agentId: vals.agent,
            clientId: vals.client,
            campaignId: vals.campaign,
            weekEnding: vals.weekEnding,
            isAutomated: vals.isAutomated,
            isReleased: vals.isReleased,
            automatedRelease: vals.automatedRelease
        };
    }

    private setActiveFilters(values:any):PayrollFilterType[] {
        let result = [];
        for(const p in values) {
            switch(p) {
                case 'agent':
                    if(values[p] != null) result.push(PayrollFilterType.agent);
                    break;
                case 'client':
                    if(values[p] != null) result.push(PayrollFilterType.client);
                    break;
                case 'campaign':
                    if(values[p] != null) result.push(PayrollFilterType.campaign);
                    break;
                case 'weekEnding':
                    if(values[p] != null) result.push(PayrollFilterType.weekEnding);
                    break;
                case 'isAutomated':
                    if(values[p]) result.push(PayrollFilterType.isAutomated);
                    break;
                case 'isReleased':
                    if(values[p]) result.push(PayrollFilterType.isReleased);
                    break;
                case 'automatedRelease':
                    if(values[p] != null) result.push(PayrollFilterType.automatedRelease);
                    break;
                default:
                    break;
            }
        }
        return result;
    }

    private patchForm():void {
        this.f.patchValue({
            startDate: this.filters.startDate,
            endDate: this.filters.endDate,
            agent: this.filters.agentId,
            campaign: this.filters.campaignId,
            client: this.filters.clientId,
            weekEnding: this.filters.weekEnding,
            isAutomated: this.filters.isAutomated || false,
            isReleased: this.filters.isReleased || false,
            automatedRelease: this.filters.automatedRelease
        });
    }

    private createForm():FormGroup {
        return this.fb.group({
            startDate: this.fb.control('', [Validators.required]),
            endDate: this.fb.control('', [Validators.required]),
            agent: this.fb.control(''),
            campaign: this.fb.control(''),
            weekEnding: this.fb.control(''),
            isAutomated: this.fb.control(false),
            isReleased: this.fb.control(false),
            automatedRelease: this.fb.control(''),
            client: this.fb.control('')
        });
    }
}
