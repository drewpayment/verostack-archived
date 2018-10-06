import {Component, OnInit, Inject, ViewChild, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CampaignService} from '@app/campaigns/campaign.service';
import {IUser, ICampaign} from '@app/models';
import {SessionService} from '@app/session.service';
import {MessageService} from '@app/message.service';
import { QuillEditorComponent } from 'ngx-quill';

interface DialogData {
    user:IUser,
    campaign:ICampaign
}

@Component({
    selector: 'app-new-campaign-dialog',
    templateUrl: './new-campaign-dialog.component.html',
    styleUrls: ['./new-campaign-dialog.component.scss']
})
export class NewCampaignDialogComponent implements OnInit {
    user: IUser;
    campaign: ICampaign;
    form: FormGroup;
    @ViewChild('editor') editor: QuillEditorComponent

    // set to true if an existing campaign has been opened
    hasExistingCampaign: boolean = false;
    modules:any = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],  // toggled buttons
            [{ 'font': [] }],
            [{ 'color': [], 'background': [] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // headings
            [{ 'align': [] }],
            ['blockquote'],
            [{ 'indent': '-1'}, { 'indent': '+1' }], // indentations
            ['link', 'image'] // media
        ]
    }

    constructor(
        public diagRef: MatDialogRef<NewCampaignDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private service: CampaignService,
        private session: SessionService,
        private msg: MessageService
    ) {
        this.hasExistingCampaign = this.data.campaign != null;

        if (!this.hasExistingCampaign) {
            this.createForm();
            this.campaign = this.createEmptyCampaign();
        } else {
            this.campaign = data.campaign;
            this.createForm(this.campaign);
        }

        this.user = this.data.user;
    }

    ngOnInit() {
        this.session.loadTokenStorageItem();
    }

    onNoClick():void {
        this.diagRef.close();
    }

    /**
     * Save a new/existing campaign entity to the database.
     *
     */
    saveCampaign(): void {
        // If this dialog had an existing campaign passed to it when it opened
        // we are going to skip checking if one exists, so that we don't get an error
        // telling us we can't update.
        if (this.hasExistingCampaign) {
            this.campaign = this.prepareCampaign();

            this.service
                .saveCampaign(this.user.selectedClient.clientId, this.campaign.campaignId, this.campaign)
                .then((updated: ICampaign) => {
                    this.diagRef.close(updated);
                })
                .catch(this.msg.showWebApiError);
        } else {
            this.service
                .checkCampaignNameAvailability(1, this.form.controls.name.value)
                .then((exists: boolean) => {
                    if (exists) {
                        this.msg.addMessage('Name already exists.', 'dismiss', 6000);
                        return;
                    }

                    this.campaign = this.prepareCampaign();

                    // FINISH THE METHOD HERE TO SAVE THE NEW CAMPAIGN
                    this.service
                        .saveCampaign(this.user.selectedClient.clientId, null, this.campaign)
                        .then(campaign => {
                            this.diagRef.close(campaign);
                        })
                        .catch(this.msg.showWebApiError);
                })
                .catch(this.msg.showWebApiError);
        }
    }

    cancel(): void {
        this.diagRef.close(null);
    }

    quillContentChanged(event) {
        console.dir(this.form.value);
    }

    // PRIVATE METHODS

    private prepareCampaign(): ICampaign {
        const form = this.form.value;
        return {
            campaignId: this.campaign.campaignId || null,
            clientId: this.user.selectedClient.clientId,
            name: form.name,
            active: form.active,
            compensation: form.compensation,
            mdDetails: form.mdDetails,
            mdOnboarding: form.mdOnboarding,
            mdOther: form.mdOther
        };
    }

    private createForm(campaign: ICampaign = null): void {
        this.form = this.fb.group({
            name: this.fb.control(campaign == null ? '' : campaign.name, [Validators.required]),
            active: this.fb.control(campaign == null ? true : campaign.active),
            compensation: this.fb.control(campaign == null ? '' : campaign.compensation || '', [Validators.pattern(/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/)]),
            mdDetails: this.fb.control(campaign == null ? '' : campaign.mdDetails || ''),
            mdOnboarding: this.fb.control(campaign == null ? '' : campaign.mdOnboarding || ''),
            mdOther: this.fb.control(campaign == null ? '' : campaign.mdOther || '')
        });
    }

    private createEmptyCampaign(): ICampaign {
        return <ICampaign>{
            campaignId: null,
            clientId: null,
            name: null,
            active: true,
            compensation: null,
            mdDetails: null,
            mdOnboarding: null,
            mdOther: null
        };
    }
}
