import {Component, OnInit} from '@angular/core';
import {CampaignService} from '@app/campaigns/campaign.service';
import { ICampaign, User, Utility } from '@app/models';
import { ActivatedRoute, Router } from '@angular/router';
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
    form:FormGroup = this.createForm();

    modules = QuillConfig.DEFAULT_MODULE;

    constructor(
        private route:ActivatedRoute, 
        private service: CampaignService, 
        private session:SessionService,
        private fb:FormBuilder,
        private router:Router
    ) {
        this.route.params.subscribe(params => {
            this.campaignId = params.campaignId;
        });
    }

    ngOnInit() {
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

    editUtility(utility:Utility) {
        this.service.utility = utility;
        this.service.campaign = this._campaign;
        this.router.navigate(['/utilities', utility.utilityId]);
    }

    addUtility():void {
        this.service.campaign = this._campaign;
        this.router.navigate(['/add-utility']);
    }

    isEven(value):boolean {
        return value % 2 == 0;
    }

    private createForm():FormGroup {
        return this.fb.group({
            mdDetails: this.fb.control(''),
            mdOnboarding: this.fb.control(''),
            mdOther: this.fb.control(''),
            compensation: this.fb.control(''),
            utilities: this.fb.array([])
        });
    }

    private patchForm() {
        this.form.patchValue({
            mdDetails: this._campaign.mdDetails,
            mdOnboarding: this._campaign.mdOnboarding,
            mdOther: this._campaign.mdOther,
            compensation: this._campaign.compensation,
            utilities: this._campaign.utilities != null ? this._campaign.utilities : []
        });
    }

}
