import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { User, IAgent, DailySale, ICampaign, Utility, Remark, SaleStatus } from '@app/models';
import { Contact } from '@app/models/contact.model';
import { SessionService } from '@app/session.service';
import { ContactService } from '@app/contact/contact.service';
import { AgentService } from '@app/agent/agent.service';
import { CampaignService } from '@app/campaigns/campaign.service';
import { Observable, Subject, from, of, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { States, IState } from '@app/shared/models/state.model';
import { ClientService } from '@app/client-information/client.service';
import { DailySaleTrackerService } from '@app/daily-sale-tracker/daily-sale-tracker.service';
import { MessageService } from '@app/message.service';
import { Router } from '@angular/router';

@Component({
    selector: 'vs-new-sale',
    templateUrl: './new-sale.component.html',
    styleUrls: ['./new-sale.component.scss']
})
export class NewSaleComponent implements OnInit {

    user:User;
    form:FormGroup = this.createForm();
    formRemarks:Remark[];
    formSubmitted:boolean = false;
    showNewContactFields:boolean = false;
    showSetContactUI:boolean = false;
    showNewRemarkField:boolean = false;
    private _contacts:Contact[];
    contacts:Observable<Contact[]>;
    private _agents:IAgent[];
    agents:Observable<IAgent[]>;
    private _campaigns:ICampaign[];
    campaigns:Observable<ICampaign[]>;
    private _saleStatuses:SaleStatus[];
    saleStatuses:BehaviorSubject<SaleStatus[]> = new BehaviorSubject<SaleStatus[]>([]);

    /** internal use only, keeps track of all available utilities */
    private _utilities:Utility[];
    utilities:BehaviorSubject<Utility[]> = new BehaviorSubject<Utility[]>([]);

    states:IState[] = States.$get();
    returnUrl:string = '';

    constructor(
        private fb:FormBuilder, 
        private session:SessionService, 
        private contactService:ContactService, 
        private agentService:AgentService,
        private campaignService:CampaignService,
        private clientService:ClientService,
        private saleService:DailySaleTrackerService,
        private message:MessageService,
        private router:Router
    ) {}

    ngOnInit() {
        this.returnUrl = this.session.previousUrl;
        this.session.getUserItem().subscribe(u => {
            this.user = u;

            this.contactService.getContactsByClient(this.user.sessionUser.sessionClient)
                .pipe(tap(next => this._contacts = next))
                .subscribe(contacts => this.contacts = of(contacts));

            this.agentService.getAgentsByClient(this.user.sessionUser.sessionClient)
                .pipe(tap(next => this._agents = next))
                .subscribe(agents => this.agents = of(agents));

            this.campaignService.getCampaignsByClient(this.user.sessionUser.sessionClient)
                .pipe(tap(next => {
                    this._campaigns = next;
                    this._utilities = [];
                    next.forEach(c => this._utilities = this._utilities.concat(c.utilities));
                }))
                .subscribe(campaigns => this.campaigns = of(campaigns));

            this.clientService.getSaleStatuses(this.user.sessionUser.sessionClient)
                .subscribe(statuses => {
                    this._saleStatuses = statuses.filter(s => s.isActive);
                    this.saleStatuses.next(this._saleStatuses);
                });

            this.initializeComponent();
        });
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

    showNewRemarkForm() {
        if(!this.form.value.remarks.length)
            (<FormArray>this.form.controls.remarks).patchValue([]);
        (<FormArray>this.form.controls.remarks).push(this.fb.group({
            remarkId: this.fb.control(''),
            dailySaleId: this.fb.control(''),
            description: this.fb.control('', [Validators.required])
        }));

        this.formRemarks = [{} as Remark];
        this.showNewRemarkField = true;
    }

    undoRemark():void {
        let i = 0;

        while((<FormArray>this.form.controls.remarks).length) {
            (<FormArray>this.form.controls.remarks).removeAt(i);
            i++;
        }
        
        this.form.controls.remarks.reset();
        this.showNewRemarkField = false;
    }

    displayFn(contact:Contact):string {
        return typeof contact === 'object' && contact != null
            ? `${contact.firstName} ${contact.lastName}`
            : '';
    }

    private initializeComponent() {

        /** watch for form changes to campaign id and update utility dropdown options accordingly */
        this.form.controls.campaignId.valueChanges.subscribe(val => {
            const filteredUtils = this._utilities.filter(u => u.campaignId == val);
            if(!filteredUtils.length) {
                this.form.patchValue({ utilityId: null });
                this.form.controls.utilityId.reset();
            }
                
            this.utilities.next(filteredUtils);
        });

    }

    save():void {

        /**
         * Check to see if the user selected and existing contact or if they used the "new contact"
         * form to create a new contact and then revalidate the sale form.
         */
        if(this.form.get('existingContact').dirty && this.form.get('existingContact').valid) {
            delete this.form.controls['contact'];
        } else if(this.form.get('contact').dirty && this.form.get('contact').valid) {
            delete this.form.controls['existingContact'];
        }

        this.setControlsTouched(this.form);
        this.form.updateValueAndValidity();
        if(this.form.invalid) return;

        const model = this.prepareModel();

        /** WRITE THE SERVICE CALL TO DAILY SALE CONTROLLER */
        this.saleService.saveSaleWithContactInfo(this.user.sessionUser.sessionClient, model.campaignId, model)
            .subscribe(sale => {
                this.message.addMessage('Sale saved!', 'dismiss', 5000);
                setTimeout(() => this.router.navigate(['/daily-tracker']), 2500);
            }, err => {
                console.error(err);
            });
    }

    clearForm():void {
        this.form.reset();
        this.router.navigate([this.returnUrl]);
    }

    validateContactInput(event:any) {
        const input = event.target.value;
        let exists:boolean = false;
        this._contacts.forEach(c => {
            if(c.firstName.includes(input))
                return exists = true;
            if(c.lastName.includes(input))
                return exists = true;
        });
        if(!exists)
            this.form.get('existingContact').setErrors({ nonExistent: true });
    }

    private createForm() {
        return this.fb.group({
            dailySaleId: this.fb.control(''),
            agentId: this.fb.control('', [Validators.required]),
            campaignId: this.fb.control('', [Validators.required]),
            utilityId: this.fb.control('', [Validators.required]),
            contactId: this.fb.control('',),
            clientId: this.fb.control(''),
            podAccount: this.fb.control('', [Validators.required]),
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
            }),
            status: this.fb.control('', [Validators.required]),
            saleDate: this.fb.control('', [Validators.required]),
            paidStatus: this.fb.control(''),
            paidDate: this.fb.control(''),
            chargeDate: this.fb.control(''),
            repaidDate: this.fb.control(''),
            remarks: this.fb.array([])
        });
    }

    private contactValidatorFn():ValidatorFn {
        return (control:AbstractControl): {[key:string]:any} | null => {
            const invalid = control.value == null && this.form.get('contact').invalid;
            return invalid ? {'required': { value: control.value } } : null;
        }
    }

    private prepareModel():DailySale {
        return {
            dailySaleId: this.form.value.dailySaleId,
            agentId: this.form.value.agentId,
            campaignId: this.form.value.campaignId,
            utilityId: this.form.value.utilityId,
            clientId: this.form.value.clientId || this.user.sessionUser.sessionClient,
            podAccount: this.form.value.podAccount,
            contact: typeof this.form.value.existingContact === 'object'
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
            },
            status: this.form.value.status,
            paidStatus: this.form.value.paidStatus,
            saleDate: this.form.value.saleDate,
            paidDate: this.form.value.paidDate,
            chargeDate: this.form.value.chargeDate,
            repaidDate: this.form.value.repaidDate,
            remarks: this.form.value.remarks.length > 0 
                ? this.form.value.remarks
                : null
        }
    }
}
