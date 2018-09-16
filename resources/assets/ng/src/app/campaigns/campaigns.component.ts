import { Component, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewCampaignDialogComponent } from '@app/campaigns/new-campaign-dialog/new-campaign-dialog.component';
import { EventEmitter } from 'events';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser, ICampaign } from '@app/models';
import { SessionService } from '@app/session.service';
import { CampaignService } from '@app/campaigns/campaign.service';
import { MessageService } from '@app/message.service';
import { UserRole } from '@app/models/role.model';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  activeTab:number;
  tableData:ICampaign[];

  activeTableColumns = ['name', 'campaignId', 'active', 'createdAt', 'updatedAt'];
  activeTableSource:ICampaign[] = [];

  inactiveTableSource:ICampaign[] = [];

  floatBtnIsOpen$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  floatIsOpen:Observable<boolean>;

  user:IUser;

  constructor(
    private dialog:MatDialog,
    private session:SessionService,
    private service:CampaignService,
    private msg:MessageService
  ) {}

  ngOnInit() {
    this.session.showLoader();
    this.session.userItem.subscribe((next:IUser) => {
      if(next == null) return;
      this.user = next;

      // if the user isn't at least a company admin, then we are going to send them back to the page they
      // were prior to reaching this point...
      if(this.user.role.role < UserRole.companyAdmin)
        this.session.navigateBack()
          .then(result => {
            console.dir(result);
          });

      this.service.getCampaigns(this.user.selectedClient.clientId, false)
        .then((campaigns:ICampaign[]) => {
          this.tableData = campaigns;
          this.sortCampaignsByStatus();
          this.session.hideLoader();
        })
        .catch(this.msg.showWebApiError);
    });

    this.floatIsOpen = this.floatBtnIsOpen$.asObservable();
  }

  switchActiveStatus(item:ICampaign):void {
    this.session.showLoader();
    let pendingCampaign:ICampaign;
    for(let i = 0; i < this.tableData.length; i++) {
      // if this isn't the right campaign, skip it
      if(item.campaignId != this.tableData[i].campaignId) continue;

      pendingCampaign = item;
      pendingCampaign.active = !this.tableData[i].active;

      this.service.saveCampaign(
        this.user.selectedClient.clientId,
        pendingCampaign.campaignId,
        pendingCampaign
      ).then((updated:ICampaign) => {
        this.session.hideLoader();
        this.tableData[i] = updated;
        this.sortCampaignsByStatus();
        this.updateActiveTab();
      })
      .catch(this.msg.showWebApiError);

      // if we got here, we did all of our work and we can just
      // break out of the rest of the loop.
      break;
    }
  }

  addCampaign():void {
    this.floatBtnIsOpen$.next(true);
    // show dialog with form...
    let ref = this.dialog.open(NewCampaignDialogComponent, {
      width: '300px',
      data: {
        data: this.user
      }
    });

    ref.afterClosed().subscribe((result:ICampaign) => {
      this.floatBtnIsOpen$.next(false);
      if(result == null) return;

      // do whatever updates that need to happen right here after adding a new campaign
      this.tableData.push(result);
      this.sortCampaignsByStatus();
      this.updateActiveTab();
    });
  }

  editCampaign(item:ICampaign):void {
    let ref = this.dialog.open(NewCampaignDialogComponent, {
      width: '300px',
      data: {
        data: this.user,
        campaign: item
      }
    });

    ref.afterClosed().subscribe((result:ICampaign) => {
      if(result == null) return;

      for(let i = 0; i < this.tableData.length; i++) {
        // if the campaign ids don't match, skip to the next iteration
        if(this.tableData[i].campaignId != result.campaignId) continue;

        this.tableData[i] = result;
        this.sortCampaignsByStatus();
        this.updateActiveTab();
      }

    });
  }

  // PRIVATE METHODS

  private sortCampaignsByStatus():void {
    this.activeTableSource = [];
    this.inactiveTableSource = [];

    for(let i = 0; i < this.tableData.length; i++) {
      let item = this.tableData[i];
      if(item.active) {
        this.activeTableSource.push(item);
      } else {
        this.inactiveTableSource.push(item);
      }
    }

    this.activeTableSource = _.sortBy(this.activeTableSource, ['name']);
    this.inactiveTableSource = _.sortBy(this.inactiveTableSource, ['name']);
  }

  private updateActiveTab():void {
    if(this.activeTableSource.length === 0
      && this.inactiveTableSource.length > 0
    ) {
      this.activeTab = 1;
    } else if (this.inactiveTableSource.length === 0
      && this.activeTableSource.length > 0
    ) {
      this.activeTab = 0;
    }
  }

}

const TABLE_DATA:ICampaign[] = [
  { campaignId: 1, clientId: 0, name: 'Consumers', active: true, createdAt: new Date(), updatedAt: new Date() },
  { campaignId: 2, clientId: 0, name: 'DTE', active: true, createdAt: new Date(), updatedAt: new Date() },
  { campaignId: 3, clientId: 0, name: 'Spark', active: false, createdAt: new Date(), updatedAt: new Date() }
]
