import {Component, OnInit} from '@angular/core';
import {CampaignService} from '@app/campaigns/campaign.service';
import { ICampaign, User } from '@app/models';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '@app/session.service';
import { BehaviorSubject } from 'rxjs';
import { QuillConfig } from '@app/shared/quill-config';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'vs-campaign-detail',
    templateUrl: './campaign-detail.component.html',
    styleUrls: ['./campaign-detail.component.scss']
})
export class CampaignDetailComponent implements OnInit {

    user:User;
    campaignId:number;
    private _campaign:ICampaign;
    campaign:BehaviorSubject<ICampaign> = new BehaviorSubject<ICampaign>({} as ICampaign);
    form:FormGroup;

    modules = QuillConfig.DEFAULT_MODULE;

    constructor(
        private route:ActivatedRoute, 
        private service: CampaignService, 
        private session:SessionService,
        private fb:FormBuilder
    ) {
        this.route.params.subscribe(params => {
            this.campaignId = params.campaignId;
        });
    }

    ngOnInit() {
        this.createForm();

        this.session.userItem.subscribe(u => {
            this.user = u;

            this.service.getCampaign(this.user.sessionUser.sessionClient, this.campaignId)
                .subscribe(campaign => {
                    this._campaign = campaign;
                    this.campaign.next(campaign);
                    this.patchForm();
                });
        });
    }

    quillContentChanged(event) {
        console.dir(event);
    }

    private createForm() {
        this.form = this.fb.group({
            mdDetails: this.fb.control(''),
            mdOnboarding: this.fb.control(''),
            mdOther: this.fb.control(''),
            compensation: this.fb.control('')
        });
    }

    private patchForm() {
        this.form.patchValue({
            mdDetails: this._campaign.mdDetails,
            mdOnboarding: this._campaign.mdOnboarding,
            mdOther: this._campaign.mdOther,
            compensation: this._campaign.compensation
        });
    }

}
