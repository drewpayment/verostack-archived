import {Component, OnInit, Inject, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn, AbstractControl} from '@angular/forms';
import {SaleStatus, IAgent, ICampaign, DailySale, User, Remark, PaidStatusType, Utility, ContactType} from '@app/models';

import * as moment from 'moment';
import * as _ from 'lodash';
import {IState, States} from '@app/shared/models/state.model';
import {Moment} from 'moment';
import {CampaignService} from '@app/campaigns/campaign.service';
import {Router} from '@angular/router';
import { Contact } from '@app/models/contact.model';
import { ContactService } from '@app/contact/contact.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { coerceNumberProperty, showFieldAnimation } from '@app/utils';
import { Role } from '@app/models/role.model';

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

/**
 * This is the dialog used to create a sale as an admin from the daily-sale tracker
 */
@Component({
    selector: 'vs-add-daily-sale',
    templateUrl: './add-sale.component.html',
    styleUrls: ['./add-sale.component.scss'],
    animations: showFieldAnimation
})
export class AddSaleDialogComponent implements OnInit, AfterViewInit {
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
    campaigns:ICampaign[] = [];
    user:User;
    hideTooltip = false;
    showAddRemarkInput = false;
    newRemarkInputValue: FormControl;
    submitted: boolean;
    remarkControl: FormGroup;
    isExistingSale: boolean;
    showEditContactForm = false;
    contacts:Contact[];
    contacts$:Observable<Contact[]>;
    showNewContactFields = false;
    showSetContactUI = false;
    showBusinessNameField = false;

    /** internal use only, keeps track of all available utilities */
    private _utilities:Utility[];
    utilities:BehaviorSubject<Utility[]> = new BehaviorSubject<Utility[]>(null);
    @ViewChild(MatAutocomplete, { static: true }) agentAutocomplete:MatAutocomplete;

    constructor(
        public ref: MatDialogRef<AddSaleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private campaignService: CampaignService,
        private router: Router,
        private contactService:ContactService,
        private _cd:ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.newRemarks = [];
        this.today = moment();
        this.existingSale = this.data.sale || {} as DailySale;
        this.isExistingSale = this.data.sale != null;
        this.remarks = this.data.sale != null ? this.data.sale.remarks : [];
        this.sortRemarks();
        this.statuses = this.data.statuses.filter(s => s.isActive);
        this.agents = this.data.agents.filter(a => a.isActive);
        this.selectedCampaign = this.data.selectedCampaign;
        this.user = this.data.user;

        this.contactService.getContactsByClient(this.user.sessionUser.sessionClient)
            .subscribe(contacts => {
                this.contacts = contacts;

                this._setObservables();
            });

        if (this._checkForSelfEntryUser()) {
            this.agents = this.agents.filter(a => a.userId == this.user.id);
        }

        if (this.isExistingSale && this.data.campaigns == null) {
            this.campaignService.getCampaigns(this.user.sessionUser.sessionClient, false).then(results => {

                if (this._checkForSelfEntryUser()) {
                    this.campaigns = results.filter(r => this.agents[0].salesPairings.filter(sp => sp.campaignId == r.campaignId));
                } else {
                    this.campaigns = results;
                }

            });
        } else {
            if (this._checkForSelfEntryUser()) {
                this.campaigns = this.data.campaigns.filter(c => this.agents[0].salesPairings.find(sp => sp.campaignId == c.campaignId));
            } else {
                this.campaigns = this.data.campaigns;
            }
        }

        // remove "all campaigns" option, so that the user has to be pick a valid campaign
        this.campaigns = this.campaigns.filter(c => c.campaignId != 0);

        this.createForm();
    }

    private _checkForSelfEntryUser():boolean {
        return this.user.role.role < Role.companyAdmin && this.user.role.isSalesAdmin;
    }

    onNoClick(): void {
        this.ref.close();
    }
    
    ngAfterViewInit() {
        const doNotEmit = { emitEvent: false };

        /** watch for form changes to campaign id and update utility dropdown options accordingly */
        this.form.controls.campaign.valueChanges.subscribe(val => this._updateUtilities(val));

        this.form.controls.paidDate.valueChanges.subscribe(val =>
            this.form.patchValue({ paidStatus: val == null 
                ? PaidStatusType.unpaid.toString() : PaidStatusType.paid.toString() }, doNotEmit));

        this.form.controls.repaidDate.valueChanges.subscribe(val => 
            this.form.patchValue({ paidStatus: val == null 
                ? PaidStatusType.unpaid.toString() : PaidStatusType.repaid.toString() }, doNotEmit));

        this.form.controls.chargeDate.valueChanges.subscribe(val =>
            this.form.patchValue({ paidStatus: val == null 
                ? PaidStatusType.unpaid.toString() : PaidStatusType.chargeback.toString() }, doNotEmit));

        this.form.controls.paidStatus.valueChanges.subscribe((value:PaidStatusType) => {
            switch (coerceNumberProperty(value)) {
                case PaidStatusType.paid:
                    this.form.patchValue({ paidDate: moment() });
                    break;
                case PaidStatusType.repaid:
                    this.form.patchValue({ repaidDate: moment() }, doNotEmit);
                    break;
                case PaidStatusType.chargeback:
                    this.form.patchValue({ chargeDate: moment() }, doNotEmit);
                    break;
                case PaidStatusType.unpaid:
                default:
                    this.form.patchValue({ paidDate: '', chargeDate: '', repaidDate: '' }, doNotEmit);
                    break;    
            }
        });

        if (this._checkForSelfEntryUser()) {
            this.selectedCampaign = this.campaigns[0];
            this.form.get('campaign').setValue(this.campaigns[0].campaignId);
            this.form.get('agent').setValue(this.agents[0]);
        }

        this._cd.detectChanges();
    }

    private _updateUtilities(campaignId:number):void {
        const campaign = this.campaigns.find(c => c.campaignId == campaignId);
        const filteredUtils = campaign.utilities;

        if(!filteredUtils.length) {
            this.form.patchValue({ utilityId: null });
            this.form.controls.utilityId.reset();
        }

        this.utilities.next(filteredUtils);
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
        if (this.form.get('existingContact').value.contactId != null && this.form.get('existingContact').value.contactId > 0) {
            delete this.form.controls['contact'];
        } else {
            delete this.form.controls['existingContact'];
        }

        this.form.updateValueAndValidity();
        if (this.form.invalid) return;

        const dto = this.prepareModel();
        this.ref.close(dto);
    }

    validateContactInput(event:any) {
        const input = event.target.value.toLowerCase();
        let exists = false;
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
        let exists = false;
        this.agents.forEach(a => {
            if (a.firstName.includes(input))
                return exists = true;
            if (a.lastName.includes(input))
                return exists = true;
        });
        if (!exists) this.form.get('agent').setErrors({ nonExistent: true });
    }

    showNewContactForm():void {
        if (this.form.get('contact').dirty || this.form.get('contact').touched) {
            this.resetContactForm('contact');
            this.form.patchValue({
                contact: {
                    contactType: 1
                }
            }, { emitEvent: false });
        }
        
        this.showNewContactFields = !this.showNewContactFields;
    }

    setNewContact():void {
        this.setControlsTouched(this.form.get('contact') as FormGroup);
        if (this.form.get('contact').invalid) return;

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

    handleContactTypeChange(event:MatButtonToggleChange):void {
        if (event.value == ContactType.business) {
            this.form.get('contact.contactType').setValue(2, { emitEvent: false });
            this.form.get('contact.businessName').setValidators([Validators.required]);
            this.showBusinessNameField = true;
        } else {
            this.form.get('contact.contactType').setValue(1, { emitEvent: false });
            this.form.get('contact.businessName').setValidators(null);
            this.showBusinessNameField = false;
        }

        this.form.get('contact.businessName').reset();
    }

    private contactValidatorFn():ValidatorFn {
        return (control:AbstractControl): {[key:string]:any} | null => {
            const invalid = control.value == null && this.form.get('contact').invalid;
            return invalid ? {'required': { value: control.value } } : null;
        }
    }

    private createForm(): void {
        let contactType:any = this.existingSale && this.existingSale.contact
            && this.existingSale.contact.contactType
                ? this.existingSale.contact.contactType.toString()
                : ContactType.residential.toString();

        contactType = contactType || ContactType.residential;

        this.form = this.fb.group({
            saleDate: this.fb.control(this.existingSale.saleDate || this.today, [Validators.required]),
            agent: this.fb.control(this.agents.find(a => a.agentId == this.existingSale.agentId), [Validators.required]),
            campaign: this.fb.control({ value: this.selectedCampaign.campaignId || '', 
                disabled: this.isExistingSale}, [Validators.required]),
            utilityId: this.fb.control(this.existingSale.utilityId || '', [Validators.required]),
            account: this.fb.control(this.existingSale.podAccount || '', [Validators.required]),
            status: this.fb.control(this.existingSale.status || '', [Validators.required]),
            paidStatus: this.fb.control(this.formatPaidStatus() || '', [Validators.required]),
            paidDate: this.fb.control(this.existingSale.paidDate || ''),
            chargeDate: this.fb.control(this.existingSale.chargeDate || ''),
            repaidDate: this.fb.control(this.existingSale.repaidDate || ''),
            remarks: this.createRemarksFormArray(),
            existingContact: this.fb.control(this.existingSale.contact || '', [this.contactValidatorFn]),
            contact: this.fb.group({
                contactId: this.fb.control(''),
                clientId: this.fb.control(''),
                contactType: this.fb.control(contactType),
                businessName: this.fb.control(''),
                firstName: this.fb.control('', [Validators.required]),
                lastName: this.fb.control('', [Validators.required]),
                middleName: this.fb.control(''),
                prefix: this.fb.control(''),
                suffix: this.fb.control(''),
                ssn: this.fb.control(''),
                dob: this.fb.control(''),
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

        const campaignId = this.form.get('campaign').value;
        if(campaignId > 0) {
            this._updateUtilities(campaignId);
        }
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
                contactType: this.form.value.contact.contactType,
                businessName: this.form.value.contact.businessName,
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
            campaignId: this.form.value.campaign || this.form.get('campaign').value,
            utilityId: this.form.value.utilityId,
            clientId: this.user.sessionUser.sessionClient,
            status: this.form.value.status,
            paidStatus: this.form.value.paidStatus,
            paidDate: this.form.value.paidDate,
            chargeDate: this.form.value.chargeDate,
            repaidDate: this.form.value.repaidDate,
            saleDate: this.form.value.saleDate,
            podAccount: this.form.value.account,
            remarks: this.newRemarks,
            contact: contact
        };
    }

    private formatPaidStatus(): string {
        return this.existingSale.paidStatus != null ? this.existingSale.paidStatus.toString() : null;
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
