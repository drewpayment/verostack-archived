import { Component, OnInit, Inject, ViewChild, SimpleChanges } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatTooltip } from "@angular/material";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { SaleStatus, IAgent, ICampaign, DailySale, User, Remark, PaidStatusType } from "@app/models";

import * as moment from 'moment';
import * as _ from 'lodash';
import { IState, States } from "@app/shared/models/state.model";
import { Moment } from "moment";
import { CampaignService } from "@app/campaigns/campaign.service";

interface DialogData {
  statuses:SaleStatus[],
  agents:IAgent[],
  selectedCampaign:ICampaign,
  sale:DailySale,
  campaigns:ICampaign[],
  user:User
}

interface ViewRemark extends Remark {
  wordWrap?:boolean;
}

@Component({
  selector: 'vs-add-daily-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.scss']
})
export class AddSaleDialog implements OnInit {
  form:FormGroup;
  statuses:SaleStatus[];
  agents:IAgent[];
  selectedCampaign:ICampaign;
  today:moment.Moment;
  states:IState[] = States.$get();
  existingSale:DailySale;
  remarks:ViewRemark[];
  newRemarks:Remark[];
  campaigns:ICampaign[];
  user:User;
  hideTooltip:boolean = false;
  showAddRemarkInput:boolean = false;
  newRemarkInputValue:FormControl;
  submitted:boolean;
  remarkControl:FormGroup;
  isExistingSale:boolean;

  constructor(
    public ref:MatDialogRef<AddSaleDialog>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
    private fb:FormBuilder,
    private campaignService:CampaignService
  ) {}

  ngOnInit() {
    this.newRemarks = [];
    this.today = moment();
    this.existingSale = this.data.sale || {} as DailySale;
    this.isExistingSale = this.data.sale != null;
    this.remarks = this.data.sale != null
      ? this.data.sale.remarks : [];
    this.sortRemarks();
    this.statuses = this.data.statuses;
    this.agents = this.data.agents;
    this.selectedCampaign = this.data.selectedCampaign;
    this.user = this.data.user;

    if (this.isExistingSale && this.data.campaigns == null) {
      this.campaignService.getCampaigns(this.user.selectedClient.clientId, false)
        .then(results => {
          this.campaigns = results;
        });
    } else {
      this.campaigns = _.cloneDeep(this.data.campaigns);
      // remove "all campaigns" option, so that the user has to be pick a valid campaign
      _.remove(this.campaigns, {'campaignId':0});
    }

    this.createForm();
    this.submitted = true;
  }

  onNoClick():void {
    this.ref.close();
  }

  saveDialog():void {
    this.submitted = true;
    this.form.updateValueAndValidity();
    if(this.form.invalid) return;

    const dto = this.prepareModel();
    this.ref.close(dto);
  }

  getFormControlValidity(field:string):boolean {
    return this.form.get(field).invalid && (this.form.get(field).touched || this.form.pending);
  }

  getRemarkAgent(id:number):IAgent {
    return _.find(this.agents, { agentId: id }) || {} as IAgent;
  }

  addRemark():void {
    this.remarkControl = this.fb.group({
      remarkId: this.fb.control(''),
      description: this.fb.control('', [Validators.required])
    });
    (<FormArray>this.form.get('remarks')).push(this.remarkControl);
    this.showAddRemarkInput = true;
  }

  getRemarkFormControl():FormControl {
    return this.remarkControl.get('description') as FormControl;
  }

  saveNewRemark():void {
    const dto:Remark = {
      remarkId: this.remarkControl.value.remarkId,
      dailySaleId: this.existingSale.dailySaleId,
      description: this.remarkControl.value.description,
      modifiedBy: this.user.id,
      createdAt: moment(),
      updatedAt: moment(),
      user: this.user
    };
    this.remarks.push(dto);
    this.newRemarks.push(dto);
    this.showAddRemarkInput = false;
    this.sortRemarks();
  }

  cancelNewRemark():void {
    this.showAddRemarkInput = false;
  }

  handlePaidStatusChange(event):void {
    const selection:PaidStatusType = +event.value as PaidStatusType;
    let newActivityValue;

    switch(selection) {
      case PaidStatusType.paid:
        newActivityValue = this.existingSale.paidDate || null;
        break;
      case PaidStatusType.chargeback:
        newActivityValue = this.existingSale.chargeDate || null;
        break;
      case PaidStatusType.repaid:
        newActivityValue = this.existingSale.repaidDate || null;
        break;
      case PaidStatusType.unpaid:
      default:
        newActivityValue = null;
        break;
    }

    this.form.patchValue({ activityDate: newActivityValue });
  }

  private createForm():void {
    let campaignValue = this.existingSale.campaignId != null && this.existingSale.campaignId > 0
      ? this.existingSale.campaignId
      : this.selectedCampaign.campaignId > 0
        ? this.selectedCampaign.campaignId
        : '';
    this.form = this.fb.group({
      saleDate: this.fb.control(this.existingSale.saleDate || this.today, [Validators.required]),
      agent: this.fb.control(this.existingSale.agentId || '', [Validators.required]),
      campaign: this.fb.control({value: campaignValue, disabled:this.isExistingSale}, [Validators.required]),
      account: this.fb.control(this.existingSale.podAccount || '', [Validators.required]),
      firstName: this.fb.control(this.existingSale.firstName || '', [Validators.required]),
      lastName: this.fb.control(this.existingSale.lastName || '', [Validators.required]),
      address: this.fb.control(this.existingSale.street || '', [Validators.required]),
      address2: this.fb.control(this.existingSale.street2 || ''),
      city: this.fb.control(this.existingSale.city || '', [Validators.required]),
      state: this.fb.control(this.existingSale.state || '', [Validators.required]),
      zip: this.fb.control(this.existingSale.zip || '', [Validators.required]),
      status: this.fb.control(this.existingSale.status || '', [Validators.required]),
      paidStatus: this.fb.control(this.formatPaidStatus() || '', [Validators.required]),
      paidDate: this.fb.control(this.existingSale.paidDate || ''),
      chargeDate: this.fb.control(this.existingSale.chargeDate || ''),
      repaidDate: this.fb.control(this.existingSale.repaidDate || ''),
      remarks: this.createRemarksFormArray()
    });
  }

  private createRemarksFormArray():FormArray {
    let result = this.fb.array([]);
    this.remarks.forEach(r => {
      result.push(this.fb.group({
        remarkId: this.fb.control(r.remarkId),
        description: this.fb.control(r.description || '', [Validators.required])
      }));
    });
    return result;
  }

  private prepareModel():DailySale {
    return {
      dailySaleId: this.existingSale.dailySaleId || null,
      agentId: this.form.value.agent,
      campaignId: this.form.value.campaign,
      clientId: this.user.selectedClient.clientId,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      street: this.form.value.address,
      street2: this.form.value.address2,
      city: this.form.value.city,
      state: this.form.value.state,
      zip: this.form.value.zip,
      status: this.form.value.status,
      paidStatus: this.form.value.paidStatus,
      paidDate: this.setActivityDateProperty(this.form.value.paidStatus, 'paidDate'),
      chargeDate: this.setActivityDateProperty(this.form.value.paidStatus, 'chargeDate'),
      repaidDate: this.setActivityDateProperty(this.form.value.paidStatus, 'repaidDate'),
      saleDate: this.form.value.saleDate,
      podAccount: this.form.value.account,
      remarks: this.newRemarks
    }
  }

  private formatPaidStatus():string {
    return this.existingSale.paidStatus != null ? this.existingSale.paidStatus+'' : null;
  }

  private calculateActivityDate(sale:DailySale):Date|string|Moment {
    let activityDate:Date|string|Moment;

    switch(sale.paidStatus) {
      case PaidStatusType.paid:
        activityDate = sale.paidDate;
        break;
      case PaidStatusType.chargeback:
        activityDate = sale.chargeDate;
        break;
      case PaidStatusType.repaid:
        activityDate = sale.repaidDate;
        break;
      case PaidStatusType.unpaid:
      default:
        activityDate = null;
        break;
    }

    return activityDate;
  }

  private setActivityDateProperty(formPaidStatus:PaidStatusType, modelField:string):Date|string|Moment {
    let actMo = moment(this.form.value.activityDate);
    if (modelField == 'paidDate'
      && formPaidStatus == PaidStatusType.paid
      && actMo.isValid()
    ) {
      return actMo.format('YYYY-MM-DD');
    } else if (modelField == 'chargeDate'
      && formPaidStatus == PaidStatusType.chargeback
      && actMo.isValid()
    ) {
      return actMo.format('YYYY-MM-DD');
    } else if (modelField == 'repaidDate'
      && formPaidStatus == PaidStatusType.repaid
      && actMo.isValid()
    ) {
      return actMo.format('YYYY-MM-DD');
    }
    return this.existingSale[modelField] || null;
  }

  private sortRemarks():Remark[] {
    return _.orderBy(this.remarks, ['updatedAt'], ['desc']) as Remark[];
  }
}
