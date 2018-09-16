import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CampaignService } from '@app/campaigns/campaign.service';
import { IUser, ICampaign } from '@app/models';
import { SessionService } from '@app/session.service';
import { MessageService } from '@app/message.service';

@Component({
  selector: 'app-new-campaign-dialog',
  templateUrl: './new-campaign-dialog.component.html',
  styleUrls: ['./new-campaign-dialog.component.scss']
})
export class NewCampaignDialogComponent implements OnInit {

  user:IUser;
  campaign:ICampaign;
  form:FormGroup;

  // set to true if an existing campaign has been opened
  hasExistingCampaign:boolean = false;

  constructor(
    public diagRef: MatDialogRef<NewCampaignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private service:CampaignService,
    private session:SessionService,
    private msg:MessageService
  ) {
    this.hasExistingCampaign = data.campaign != null;

    if(!this.hasExistingCampaign) {
      this.createForm();
      this.campaign = this.createEmptyCampaign();
    } else {
      this.campaign = data.campaign;
      this.createForm(this.campaign);
    }

    this.user = data.data;
  }

  ngOnInit() {
    this.session.loadTokenStorageItem();
  }

  /**
   * Save a new/existing campaign entity to the database.
   *
   */
  saveCampaign():void {

    // If this dialog had an existing campaign passed to it when it opened
    // we are going to skip checking if one exists, so that we don't get an error
    // telling us we can't update.
    if(this.hasExistingCampaign) {
      this.campaign = this.prepareCampaign();

      this.service.saveCampaign(this.user.selectedClient.clientId, this.campaign.campaignId, this.campaign)
        .then((updated:ICampaign) => {
          this.diagRef.close(updated);
        })
        .catch(this.msg.showWebApiError);

    } else {

      this.service.checkCampaignNameAvailability(1, this.form.controls.name.value)
        .then((exists:boolean) => {

          if(exists) {
            this.msg.addMessage('Name already exists.', 'dismiss', 6000);
            return;
          }

          this.campaign = this.prepareCampaign();

          // FINISH THE METHOD HERE TO SAVE THE NEW CAMPAIGN
          this.service.saveCampaign(this.user.selectedClient.clientId, null, this.campaign)
            .then((campaign) => {
              this.diagRef.close(campaign);
            })
            .catch(this.msg.showWebApiError);

        })
        .catch(this.msg.showWebApiError);

    }
  }

  cancel():void {
    this.diagRef.close(null);
  }

  // PRIVATE METHODS

  private prepareCampaign():ICampaign {
    const form = this.form.value;

    const saveCampaign:ICampaign = {
      campaignId: this.campaign.campaignId || null,
      clientId: this.user.selectedClient.clientId,
      name: this.form.controls.name.value,
      active: this.form.controls.active.value
    };

    return saveCampaign;
  }

  private createForm(campaign:ICampaign = null):void {
    this.form = this.fb.group({
      name: campaign == null ? '' : campaign.name,
      active: campaign == null ? true : campaign.active
    });
  }

  private createEmptyCampaign():ICampaign {
    return <ICampaign>{
      campaignId: null,
      clientId: null,
      name: null,
      active: true
    }
  }

}
