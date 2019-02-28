import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utility, ICampaign, User } from '@app/models';
import { CampaignService } from '@app/campaigns/campaign.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { SessionService } from '@app/session.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MessageService } from '@app/message.service';

@Component({
    selector: 'vs-utility-detail',
    templateUrl: './utility-detail.component.html',
    styleUrls: ['./utility-detail.component.scss']
})
export class UtilityDetailComponent implements OnInit {

    user:User;
    campaign:ICampaign;
    utility:Utility;
    form:FormGroup = this.createForm();
    isNew:boolean;

    constructor(
        private route:ActivatedRoute, 
        private router:Router,
        private location:Location,
        private fb:FormBuilder, 
        private campaignService:CampaignService,
        private session:SessionService,
        private msg:MessageService
    ) {}

    ngOnInit() {
        this.session.getUserItem().subscribe(u => {
            this.user = u;
            this.utility = this.campaignService.utility;
            this.campaign = this.campaignService.campaign;

            if(this.utility == null) {
                this.route.paramMap
                    .pipe(
                        switchMap((params:ParamMap) => {
                            const utilityId = params.get('utilityId') as any;
                            if(utilityId == null) {
                                this.isNew = true;
                                this.campaign = this.campaignService.campaign;
                                if(this.campaign == null)
                                    this.router.navigate(['/campaigns']);
                                return of(null);
                            }
                            return this.campaignService.getUtility(this.user.sessionUser.sessionClient, utilityId);
                        })
                    )
                    .subscribe(utility => {
                        if(utility == null) return;
                        this.utility = utility;
                        this.campaign = utility.campaign;
                        this.patchForm();
                    });

            } else {
                this.patchForm();
            }
        });
    }

    cancel():void {
        this.campaignService.utility = null;
        this.campaignService.campaign = null;
        this.location.back();
    }

    saveUtility() {
        if(this.form.invalid) return;

        this.campaignService.saveUtility(this.user.sessionUser.sessionClient, this.prepareModel())
            .subscribe(utility => {
                this.utility = utility;
                this.msg.addMessage('Saved Utility successfully!', 'dismiss', 3000);
                this.router.navigate(['/campaigns', this.utility.campaignId]);
            });
    }

    private createForm() {
        return this.fb.group({
            utilityId: this.fb.control(''),
            campaignId: this.fb.control(''),
            commodity: this.fb.control(''),
            agentCompanyId: this.fb.control(''),
            agentCompanyName: this.fb.control('', [Validators.required]),
            utilityName: this.fb.control('', [Validators.required]),
            meterNumber: this.fb.control(''),
            classification: this.fb.control(''),
            price: this.fb.control(''),
            unitOfMeasure: this.fb.control(''),
            term: this.fb.control(''),
            isActive: this.fb.control(true)
        });
    }

    private patchForm() {
        this.form.patchValue({
            utilityId: this.utility.utilityId || null,
            campaignId: this.utility.campaignId || this.campaign.campaignId || null,
            commodity: this.utility.commodity || '',
            agentCompanyId: this.utility.agentCompanyId || '',
            agentCompanyName: this.utility.agentCompanyName || '',
            utilityName: this.utility.utilityName || '',
            meterNumber: this.utility.meterNumber || '',
            classification: this.utility.classification || '',
            price: this.utility.price || '',
            unitOfMeasure: this.utility.unitOfMeasure || '',
            term: this.utility.term || '',
            isActive: this.utility.isActive
        });
    }

    private prepareModel():Utility
    {
        return {
            utilityId: this.form.value.utilityId,
            campaignId: this.form.value.campaignId || this.campaign.campaignId,
            agentCompanyId: this.form.value.agentCompanyId,
            agentCompanyName: this.form.value.agentCompanyName,
            classification: this.form.value.classification,
            commodity: this.form.value.commodity,
            meterNumber: this.form.value.meterNumber,
            price: this.form.value.price,
            term: this.form.value.term,
            unitOfMeasure: this.form.value.unitOfMeasure,
            utilityName: this.form.value.utilityName,
            isActive: this.form.value.isActive
        } as Utility;
    }

}
