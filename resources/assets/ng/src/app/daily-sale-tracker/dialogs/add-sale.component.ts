import {Component, OnInit, Inject, ViewChild, SimpleChanges, AfterViewInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatTooltip} from '@angular/material';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn, AbstractControl} from '@angular/forms';
import {SaleStatus, IAgent, ICampaign, DailySale, User, Remark, PaidStatusType, Utility} from '@app/models';

import * as moment from 'moment';
import * as _ from 'lodash';
import {IState, States} from '@app/shared/models/state.model';
import {Moment} from 'moment';
import {CampaignService} from '@app/campaigns/campaign.service';
import {Router} from '@angular/router';
import { Contact } from '@app/models/contact.model';
import { ContactService } from '@app/contact/contact.service';
import { tap, startWith, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

interface DialogData {
    statuses: SaleStatus[];
    agents: IAgent[];
    selectedCampaign: ICampaign;
    sale: DailySale;
    campaigns: ICampaign[];
    user: User;
}

interface ViewRemark extends Remark {
    wordWrap?: boolean;
}

@Component({
    selector: 'vs-add-daily-sale',
    templateUrl: './add-sale.component.html',
    styleUrls: ['./add-sale.component.scss']
})
export class AddSaleDialog implements OnInit, AfterViewInit {
    form: FormGroup;
    statuses:SaleStatus[] = [];
    agents:IAgent[] = [];
    agents$:Observable<IAgent[]>;
    selectedCampaign:ICampaign;
    today:moment.Moment;
    states:IState[] = States.$get();
    existingSale:DailySale;
    remarks:ViewRemark[] = [];
    newRemarks:Remark[];
    campaigns:ICampaign[]= [];
    user:User;
    hideTooltip: boolean = false;
    showAddRemarkInput: boolean = false;
    newRemarkInputValue: FormControl;
    submitted: boolean;
    remarkControl: FormGroup;
    isExistingSale: boolean;
    showEditContactForm:boolean = false;
    contacts:Contact[];
    contacts$:Observable<Contact[]>;
    showNewContactFields:boolean = false;
    showSetContactUI:boolean = false;

    /** internal use only, keeps track of all available utilities */
    private _utilities:Utility[];
    utilities:BehaviorSubject<Utility[]> = new BehaviorSubject<Utility[]>(null);

    constructor(
        public ref: MatDialogRef<AddSaleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private campaignService: CampaignService,
        private router: Router,
        private contactService:ContactService
    ) {}

    ngOnInit() {
        this.newRemarks = [];
        this.today = moment();
        this.existingSale = this.data.sale || ({} as DailySale);
        this.isExistingSale = this.data.sale != null;
        this.remarks = this.data.sale != null ? this.data.sale.remarks : [];
        this.sortRemarks();
        this.statuses = this.data.statuses.filter(s => s.isActive);
        this.agents = this.data.agents;
        this.selectedCampaign = this.data.selectedCampaign;
        this.user = this.data.user;

        this.contactService.getContactsByClient(this.user.sessionUser.sessionClient)
            .subscribe(contacts => {
                this.contacts = contacts;

                this._setObservables();
            });

        if (this.isExistingSale && this.data.campaigns == null) {
            this.campaignService.getCampaigns(this.user.sessionUser.sessionClient, false).then(results => {
                this.campaigns = results;
            });
        } else {
            this.campaigns = this.data.campaigns;
            // remove "all campaigns" option, so that the user has to be pick a valid campaign
            if(this.campaigns[0].campaignId == 0) this.campaigns.shift();
        }

        this.createForm();
        this.submitted = true;
    }

    onNoClick(): void {
        this.ref.close();
    }
    
    ngAfterViewInit() {
        /** watch for form changes to campaign id and update utility dropdown options accordingly */
        this.form.controls.campaign.valueChanges.subscribe(val => {
            const campaign = this.campaigns.find(c => c.campaignId == val);
            const filteredUtils = campaign.utilities;
            
            if(!filteredUtils.length) {
                this.form.patchValue({ utilityId: null });
                this.form.controls.utilityId.reset();
            }
                
            this.utilities.next(filteredUtils);
        });
    }

    private _setObservables() {
        this.agents$ = of(this.agents);
        this.contacts$ = of(this.contacts);
    }

    _filterAgents(event):void {
        const filterValue = event.target.value.toLowerCase();
        const filtered = this.agents.filter(agent => {
            if(agent.firstName.toLowerCase().indexOf(filterValue) === 0)
                return true;
            if(agent.lastName.toLowerCase().indexOf(filterValue) === 0)
                return true;
            return false;
        });
        this.agents$ = of(filtered);
    }

    navigateToUtilitySetup() {
        this.router.navigate(['/campaigns', this.form.get('campaign').value]);
    }

    saveDialog(): void {
        this.submitted = true;
        
        /**
         * Check to see if the user selected and existing contact or if they used the "new contact"
         * form to create a new contact and then revalidate the sale form.
         */
        if(this.form.get('existingContact').dirty && this.form.get('existingContact').valid) {
            delete this.form.controls['contact'];
        } else if(this.form.get('contact').dirty && this.form.get('contact').valid) {
            delete this.form.controls['existingContact'];
        }

        this.form.updateValueAndValidity();
        if (this.form.invalid) return;

        const dto = this.prepareModel();
        this.ref.close(dto);
    }

    validateContactInput(event:any) {
        const input = event.target.value.toLowerCase();
        let exists:boolean = false;
        const filtered = this.contacts.filter(c => {
            if(c.firstName.toLowerCase().indexOf(input) === 0 || c.lastName.toLowerCase().indexOf(input) === 0) {
                exists = (!exists) ? true : exists;
                return true;
            }
            return false;
        });
        this.contacts$ = of(filtered);
    }

    validateAgentInput(event) {
        const input = event.target.value.trim().toLowerCase();
        let exists:boolean = false;
        this.agents.forEach(a => {
            if(a.firstName.includes(input))
                return exists = true;
            if(a.lastName.includes(input))
                return exists = true;
        });
        if(!exists) this.form.get('agent').setErrors({ nonExistent: true });
    }

    showNewContactForm():void {
        this.resetContactForm('contact');
        this.showNewContactFields = !this.showNewContactFields;
    }

    setNewContact():void {
        this.setControlsTouched(this.form.get('contact') as FormGroup);
        if(this.form.get('contact').invalid) return;

        this.showNewContactFields = false;
        this.showSetContactUI = true;
    }

    unsetNewContact(formGroupName:string):void {
        this.resetContactForm(formGroupName);
        this.showNewContactFields = false;
        this.showSetContactUI = false;
    }

    private resetContactForm(formGroupName:string):void {
        (<FormGroup>this.form.controls[formGroupName]).patchValue({
            firstName: '',
            lastName: '',
            prefix: '',
            ssn: '',
            dob: '',
            street: '',
            street2: '',
            city: '',
            state: '',
            zip: '',
            phone: '',
            email: '',
            fax: ''
        });
        this.form.get(formGroupName).reset();
    }

    private setControlsTouched(group:FormGroup) {
        for(var c in group.controls) {
            group.controls[c].markAsTouched();
            if(this.hasProperty(group.controls[c], 'controls')) {
                this.setControlsTouched(group.controls[c]['controls']);
            }
        }
    }

    private hasProperty(obj, prop):boolean {
        var proto = obj.__proto__ || obj.constructor.prototype;
        return (prop in obj) &&
            (!(prop in proto) || proto[prop] !== obj[prop]);
    }

    navigateToSaleDetail() {
        this.router.navigate(['/new-sale-contact']);
        this.ref.close();
    }

    getFormControlValidity(field: string): boolean {
        return this.form.get(field).invalid && (this.form.get(field).touched || this.form.pending);
    }

    getRemarkAgent(id: number): IAgent {
        return _.find(this.agents, {agentId: id}) || ({} as IAgent);
    }

    addRemark(): void {
        this.remarkControl = this.fb.group({
            remarkId: this.fb.control(''),
            description: this.fb.control('', [Validators.required])
        });
        (<FormArray>this.form.get('remarks')).push(this.remarkControl);
        this.showAddRemarkInput = true;
    }

    getRemarkFormControl(): FormControl {
        return this.remarkControl.get('description') as FormControl;
    }

    saveNewRemark(): void {
        const dto: Remark = {
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

    cancelNewRemark(): void {
        this.showAddRemarkInput = false;

        let i = 0;
        while((<FormArray>this.form.controls.remarks).controls.length) {
            (<FormArray>this.form.controls.remarks).removeAt(i);
            i++;
        }
        this.form.controls.remarks.reset();
    }

    handlePaidStatusChange(event): void {
        const selection: PaidStatusType = +event.value as PaidStatusType;
        let newActivityValue;

        switch (selection) {
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

        this.form.patchValue({activityDate: newActivityValue});
    }

    displayFn(contact:Contact):string {
        return typeof contact === 'object' && contact != null
            ? `${contact.firstName} ${contact.lastName}`
            : '';
    }

    displayAgentFn(agent:IAgent):string {
        return typeof agent === 'object' && agent != null
            ? `${agent.firstName} ${agent.lastName}`
            : '';
    }

    private contactValidatorFn():ValidatorFn {
        return (control:AbstractControl): {[key:string]:any} | null => {
            const invalid = control.value == null && this.form.get('contact').invalid;
            return invalid ? {'required': { value: control.value } } : null;
        }
    }

    private createForm(): void {
        let campaignValue =
            this.existingSale.campaignId != null && this.existingSale.campaignId > 0
                ? this.existingSale.campaignId
                : this.selectedCampaign.campaignId > 0
                ? this.selectedCampaign.campaignId
                : '';
        this.form = this.fb.group({
            saleDate: this.fb.control(this.existingSale.saleDate || this.today, [Validators.required]),
            agent: this.fb.control(this.existingSale.agentId || '', [Validators.required]),
            campaign: this.fb.control({value: campaignValue, disabled: this.isExistingSale}, [Validators.required]),
            contactId: this.fb.control(''),
            utilityId: this.fb.control('', [Validators.required]),
            account: this.fb.control(this.existingSale.podAccount || '', [Validators.required]),
            status: this.fb.control(this.existingSale.status || '', [Validators.required]),
            paidStatus: this.fb.control(this.formatPaidStatus() || '', [Validators.required]),
            paidDate: this.fb.control(this.existingSale.paidDate || ''),
            chargeDate: this.fb.control(this.existingSale.chargeDate || ''),
            repaidDate: this.fb.control(this.existingSale.repaidDate || ''),
            remarks: this.createRemarksFormArray(),
            existingContact: this.fb.control('', [this.contactValidatorFn]),
            contact: this.fb.group({
                contactId: this.fb.control(''),
                clientId: this.fb.control(''),
                firstName: this.fb.control('', [Validators.required]),
                lastName: this.fb.control('', [Validators.required]),
                middleName: this.fb.control(''),
                prefix: this.fb.control(''),
                suffix: this.fb.control(''),
                ssn: this.fb.control(''),
                dob: this.fb.control('', [Validators.required]),
                street: this.fb.control('', [Validators.required]),
                street2: this.fb.control(''),
                city: this.fb.control('', [Validators.required]),
                state: this.fb.control('', [Validators.required]),
                zip: this.fb.control('', [Validators.required]),
                phone: this.fb.control('', [Validators.required, Validators.pattern('[0-9]+')]),
                email: this.fb.control(''),
                fax: this.fb.control('')
            })
        });
    }

    private createRemarksFormArray():FormArray {
        let result = this.fb.array([]);
        this.remarks.forEach(r => {
            result.push(
                this.fb.group({
                    remarkId: this.fb.control(r.remarkId),
                    description: this.fb.control(r.description || '', [Validators.required])
                })
            );
        });
        return result;
    }

    private prepareModel(): DailySale {
        const contact = typeof this.form.value.existingContact === 'object'
            ? this.form.value.existingContact
            : {
                contactId: this.form.value.contactId,
                clientId: this.user.sessionUser.sessionClient,
                firstName: this.form.value.contact.firstName,
                lastName: this.form.value.contact.lastName,
                middleName: this.form.value.contact.middleName,
                prefix: this.form.value.contact.prefix,
                suffix: this.form.value.contact.suffix,
                ssn: this.form.value.contact.ssn,
                dob: this.form.value.contact.dob,
                street: this.form.value.contact.street,
                street2: this.form.value.contact.street2,
                city: this.form.value.contact.city,
                state: this.form.value.contact.state,
                zip: this.form.value.contact.zip,
                phone: this.form.value.contact.phone,
                email: this.form.value.contact.email,
                fax: this.form.value.contact.fax
            };
        return {
            dailySaleId: this.existingSale.dailySaleId || null,
            agentId: this.form.value.agent.agentId,
            campaignId: this.form.value.campaign,
            contactId: contact.contactId,
            utilityId: this.form.value.utilityId,
            clientId: this.user.sessionUser.sessionClient,
            status: this.form.value.status,
            paidStatus: this.form.value.paidStatus,
            paidDate: this.setActivityDateProperty(this.form.value.paidStatus, 'paidDate'),
            chargeDate: this.setActivityDateProperty(this.form.value.paidStatus, 'chargeDate'),
            repaidDate: this.setActivityDateProperty(this.form.value.paidStatus, 'repaidDate'),
            saleDate: this.form.value.saleDate,
            podAccount: this.form.value.account,
            remarks: this.newRemarks,
            contact: contact
        };
    }

    private formatPaidStatus(): string {
        return this.existingSale.paidStatus != null ? this.existingSale.paidStatus + '' : null;
    }

    private calculateActivityDate(sale: DailySale): Date | string | Moment {
        let activityDate: Date | string | Moment;

        switch (sale.paidStatus) {
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

    private setActivityDateProperty(formPaidStatus: PaidStatusType, modelField: string): Date | string | Moment {
        let actMo = moment(this.form.value.activityDate);
        if (modelField == 'paidDate' && formPaidStatus == PaidStatusType.paid && actMo.isValid()) {
            return actMo.format('YYYY-MM-DD');
        } else if (modelField == 'chargeDate' && formPaidStatus == PaidStatusType.chargeback && actMo.isValid()) {
            return actMo.format('YYYY-MM-DD');
        } else if (modelField == 'repaidDate' && formPaidStatus == PaidStatusType.repaid && actMo.isValid()) {
            return actMo.format('YYYY-MM-DD');
        }
        return this.existingSale[modelField] || null;
    }

    private sortRemarks(): Remark[] {
        return _.orderBy(this.remarks, ['updatedAt'], ['desc']) as Remark[];
    }
}
