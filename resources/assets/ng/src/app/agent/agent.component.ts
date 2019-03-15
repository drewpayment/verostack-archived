import {Component, OnInit, ViewChildren, QueryList, ElementRef, OnDestroy, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import {AgentService} from '@app/agent/agent.service';
import { IAgent, User, ICampaign } from '@app/models';
import { Subject, Observable, Subscription } from 'rxjs';
import { SessionService } from '@app/session.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { MatDialog, MatSlideToggleChange } from '@angular/material';
import { AddAgentDialogComponent } from '@app/core/agents/dialogs/add-agent.component';
import { FloatBtnService } from '@app/fab-float-btn/float-btn.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl, FormControl } from '@angular/forms';
import { EditAgentDialogComponent } from '@app/agent/edit-agent-dialog/edit-agent-dialog.component';
import { UserService } from '@app/user-features/user.service';
import { ISalesPairing } from '@app/models/sales-pairings.model';
import { CampaignService } from '@app/campaigns/campaign.service';
import { MessageService } from '@app/message.service';
import { AgentRulesDialogComponent } from '@app/agent/agent-rules-dialog/agent-rules-dialog.component';
import { CurrencyPipe } from '@angular/common';
import { coerceNumberProperty } from '@app/utils';

interface DataStore {
    users:User[],
    managers:IAgent[]
}

enum AgentDisplay {
    Summary, 
    Detail
}

interface UserView extends User {
    display:AgentDisplay,
    pairingsForm:FormGroup
}

const PAIRING_KEYS:string[] = ['agentId', 'campaignId', 'commission', 'clientId', 'salesId', 'salesPairingsId'];

@Component({
    selector: 'vs-agent',
    templateUrl: './agent.component.html',
    styleUrls: ['./agent.component.scss'],
    providers: [FloatBtnService, CurrencyPipe]
})
export class AgentComponent implements OnInit, AfterViewChecked, OnDestroy {
    user:User;
    store:DataStore = {} as DataStore;
    filteredUsers:User[];
    users:Observable<UserView[]>;
    users$:Subject<UserView[]> = new Subject<UserView[]>();
    managers$:Subject<IAgent[]> = new Subject<IAgent[]>();
    floatOpen$:Observable<boolean>;
    form:FormGroup;

    searchContext:string;
    showSearchContextChip = false;
    searchChipValue:string;

    /** internal use only to sort users */
    private _filteredUsers:UserView[];
    sortAscending = true;

    private _campaigns:ICampaign[];
    campaigns$:Subject<ICampaign[]> = new Subject<ICampaign[]>();
    campaigns:ICampaign[];
    disableAddPairingBtn = false;
    @ViewChildren('pairingRows') pairingRows:QueryList<ElementRef>;
    private _pairingRowsSub:Subscription;

    showInactive = true;

    constructor(
        private service:AgentService,
        private session:SessionService,
        private dialog:MatDialog,
        private floatBtnService:FloatBtnService,
        private campaignService:CampaignService,
        private fb:FormBuilder,
        private msg:MessageService,
        private changeDetector:ChangeDetectorRef,
        private userService:UserService,
        private currencyPipe:CurrencyPipe
    ) {
        this.floatOpen$ = this.floatBtnService.opened$.asObservable();
        this.users = this.users$.asObservable();
        this.users$.subscribe(next => this._filteredUsers = next);
        this.campaigns$.subscribe(next => this.campaigns = next);
    }

    ngOnInit() {
        this.session.showLoader();
        this.session.getUserItem().subscribe(user => {
            this.user = user;
            this.refreshAgents();

            this.campaignService.getCampaignsByClient(this.user.sessionUser.sessionClient)
                .subscribe(campaigns => {
                    this._campaigns = campaigns;
                    this.campaigns$.next(this._campaigns);
                });
        });
    }

    ngAfterViewChecked() {
        this._pairingRowsSub = this.pairingRows.changes.subscribe(() => {
            if (!this.pairingRows.length || !this.disableAddPairingBtn)
                return;
            this.pairingRows.last.nativeElement.focus();
            this.changeDetector.detectChanges();
        });
    }

    ngOnDestroy() {
        this._pairingRowsSub.unsubscribe();
    }

    showAddAgent():void {
        this.floatBtnService.open();

        this.dialog.open(AddAgentDialogComponent, {
            width: '600px',
            data: {
                user: this.user
            }
        })
        .afterClosed()
        .subscribe(result => {
            this.floatBtnService.close();
            if (result == null || !result) return;
            this.refreshAgents();
        });
    }

    showEditRulesDialog(user:User):void {
        this.dialog.open(AgentRulesDialogComponent, {
            width: '500px',
            data: {
                user: user
            },
            autoFocus: false
        })
        .afterClosed()
        .subscribe(result => {
            if (result == null) return;
            this.session.showLoader();
            this.userService.saveUserRoleEntity(result)
                .subscribe(role => {
                    this.session.hideLoader();
                    this.store.users.forEach((u, i, a) => {
                        if (u.id != role.userId) return;
                        a[i].role = role;
                    });

                });
        });
    }

    saveNewPairing(form:FormGroup, user:UserView) {
        if (form.invalid) return;
        this.disableAddPairingBtn = false;
        const model = this.preparePairingFromForm(form);
        model.agentId = model.agentId || user.agent.agentId;

        const isDuplicateEntry = this.isDuplicateCampaignPairing(user.agent.pairings, model.campaignId);

        if (isDuplicateEntry) return;

        this.session.showLoader();

        this.service.saveAgentSalesPairing(model, model.agentId)
            .subscribe(result => {
                user.agent.pairings[user.agent.pairings.length - 1] = result;

                this.resetPairingFormGroup(form, result);
                this.session.hideLoader();
            });
    }

    /**
     * Updates an existing sales pairing entity. This is used explicitly separate from the AgentComponent.saveNewPairing
     * because it makes different changes to the UI.
     * 
     * @param form:@type FormGroup Form that matches the corresponding ISalesPairing entity.
     * @param user:@type UserView The agent that owns this entity.
     */
    savePairingUpdate(form:FormGroup, user:UserView) {
        if (form.invalid) return;
        const model = this.preparePairingFromForm(form);

        this.session.showLoader();
        this.service.saveAgentSalesPairing(model, model.agentId)
            .subscribe(result => {
                user.agent.pairings.forEach((p:ISalesPairing, i:number) => {
                    if (p.salesPairingsId != result.salesPairingsId) return;
                    user.agent.pairings[i] = result;
                });

                this.resetPairingFormGroup(form, result);
                this.session.hideLoader();
            });
    }

    toggleAgents(event:MatSlideToggleChange):void {
        const showAll:boolean = event.checked;

        if (showAll) {
            this.users$.next(this.store.users as UserView[]);
            this.showInactive = true;
        } else {
            const filtered:UserView[] = this.store.users.filter(u => {
                return u.agent.isActive == true;
            }) as UserView[];
            this.users$.next(filtered);
            this.showInactive = false;
        }

    }

    private resetPairingFormGroup(form:FormGroup, pairing:ISalesPairing):void {
        form.patchValue({
            salesPairingsId: pairing.salesPairingsId,
            salesId: pairing.salesId,
            campaignId: pairing.campaignId,
            clientId: pairing.clientId,
            agentId: pairing.agentId
        }, { emitEvent: false });

        const formatCommission = this.currencyPipe.transform(pairing.commission);
        (<FormControl>form.get('commission')).setValue(formatCommission, { emitEvent: false, emitViewToModelChange: false });
    }

    private isDuplicateCampaignPairing(pairings:ISalesPairing[], proposedCampaignId:number):boolean {
        const existing = _.find(pairings, (p:ISalesPairing) => {
            return p.campaignId == proposedCampaignId;
        });

        if (existing) 
            this.msg.addMessage('This agent already has a code for that campaign.', 'dismiss', 5000);

        return existing != null;
    }

    cancelNewPairing(form:FormGroup, user:UserView, index:number) {
        form.patchValue({
            campaignId: null,
            salesId: null
        });
        form.reset();
        user.agent.pairings.splice(index, 1);
        (<FormArray>form.parent).removeAt(index);
        this.disableAddPairingBtn = false;
    }

    addEmptyPairing(formArray:FormArray, existingPairings:ISalesPairing[]):void {
        this.disableAddPairingBtn = true;
        if (existingPairings != null)
            existingPairings.push({} as ISalesPairing);
        else 
            existingPairings = [{} as ISalesPairing];
        formArray.push(this.buildPairingsFormGroup(PAIRING_KEYS, {} as ISalesPairing));        

        // set focus on this form new form element, so that the form scrolls to where it needs to 
        // for the user.
    }

    private preparePairingFromForm(form:FormGroup):ISalesPairing {
        let commission = form.value.commission != null 
            ? form.value.commission.toString().slice(1, form.value.commission.toString().length)
            : null;

        if (commission != null) 
            commission = coerceNumberProperty(commission);
        
        return {
            salesPairingsId: form.value.salesPairingsId || 0,
            agentId: form.value.agentId,
            clientId: form.value.clientId || this.user.sessionUser.sessionClient,
            campaignId: form.value.campaignId,
            commission: commission,
            salesId: form.value.salesId
        };
    }

    private createPairingsForm(pairings:ISalesPairing[]):FormGroup {
        const formArray:FormArray = this.fb.array([]);
        pairings.forEach(p => formArray.push(this.buildPairingsFormGroup(PAIRING_KEYS, p)));
        return this.fb.group({array:formArray});
    }

    private buildPairingsFormGroup(keys:string[], p:ISalesPairing):FormGroup {
        const group = this.fb.group({});
        keys.forEach(k => {
            let validatorFn:(control:AbstractControl) => {};
            let formControl:FormControl;

            // normalize
            const key = k.trim().toLowerCase();

            if (key == 'salesid' || key == 'campaignid') {
                validatorFn = Validators.required;
                formControl = this.fb.control(p[k] || '', [validatorFn]);
            } else if (key == 'commission') {
                const formattedValue = p[k] != null ? this.currencyPipe.transform(p[k]) : null;
                formControl = this.fb.control(formattedValue || '', { updateOn: 'blur' });
            } else {
                formControl = this.fb.control(p[k] || '');
            }
            group.addControl(k, formControl);
        });
        return group;
    }

    updateCommission(user:UserView, newValue:any, i:number):void {
        const form = user.pairingsForm.get(['array', i]) as FormGroup;

        if (isNaN(newValue.toString().charAt(0)))
            newValue = newValue.slice(1, newValue.length);

        if (isNaN(newValue)) {
            (<FormControl>form.get('commission'))
                .setValue(null, { emitEvent: false, emitViewToModelChange: false });
            this.msg.addMessage('Numbers only please.', 'dismiss', 2500);
            return;
        }

        const numVal = coerceNumberProperty(newValue);
        const formattedValue = this.currencyPipe.transform(numVal);
        (<FormControl>form.get('commission'))
                .setValue(formattedValue, { emitEvent: false, emitViewToModelChange: false });

        // if (form.invalid) return;

        // this.savePairingUpdate(form, user);
    }

    private refreshAgents():void {
        this.service.getUserAgentsByClient(this.user.sessionUser.sessionClient)
            .pipe(map(this.setMoments))
            .subscribe(users => {
                _.remove(users, u => u.agent == null);

                users.forEach((u:User, i:number) => {
                    if (u.detail == null) 
                        users[i].detail = {
                            userId: u.id,
                            street: null, 
                            street2: null,
                            city: null,
                            state: null,
                            zip: null,
                            phone: null,
                            birthDate: null,
                            ssn: null,
                            bankRouting: null,
                            bankAccount: null
                        };
                    
                    if (u.agent.pairings != null && u.agent.pairings.length)
                        users[i].pairingsForm = this.createPairingsForm(u.agent.pairings);
                    else
                        users[i].pairingsForm = this.createPairingsForm([]);
                });

                this.store.users = _.orderBy(users, ['lastName', 'firstName'], ['asc', 'asc']);
                this.users$.next(this.store.users as UserView[]);
                this.setManagers(this.store.users);
                this.session.hideLoader();
            });
    }

    private setMoments(users:UserView[]):UserView[] {
        if (!users)
            return users;
        users.forEach(user => {
            if (user.agent == null) return;
            user.agent.createdAt = moment(user.agent.createdAt);
            user.display = AgentDisplay.Summary;
        });
        return users;
    }

    private setManagers(users:User[]):void {
        this.store.managers = _.filter(users, user => {
            return user.agent.isManager;
        }) as IAgent[];
        this.managers$.next(this.store.managers);
    }

    replaceCharAt(input:string, start:number, end:number, replaceChar:string) {
        const counter = end - start;
        let calculatedReplacement:string;
        for (let i = 0; i < counter; i++) {
            calculatedReplacement += replaceChar;
        }

        return input.substr(start, end) + calculatedReplacement + input.substr(end, calculatedReplacement.length);
    }

    editAgent(user:UserView):void {
        const displayType = user.display;

        this.dialog.open(EditAgentDialogComponent, {
            width: '600px',
            data: {
                user: this.user,
                agent: user,
                managers: this.store.managers
            }
        })
        .afterClosed()
        .subscribe(result => {
            if (result == null) return; /** If the result is undefined, the user canceled the changes. */

            this.session.showLoader();            
            this.service.updateUserWithRelationships(this.user.sessionUser.sessionClient, result)
                .subscribe((user:UserView) => {
                    const idx = _.findIndex(this.store.users, {id:user.id});
                    if (idx < 0) {
                        // this will be for a new user
                    } else {
                        user.display = displayType || AgentDisplay.Summary;

                        if (user.agent.pairings != null && user.agent.pairings.length)
                            user.pairingsForm = this.createPairingsForm(user.agent.pairings);
                        else
                            user.pairingsForm = this.createPairingsForm([]);

                        this.store.users[idx] = user;
                        this.users$.next(this.store.users as UserView[]);
                        this.setManagers(this.store.users);
                        this.session.hideLoader();
                    }
                });
        });    
    }

    searchAgents(event) {
        this.searchContext = event.target.value;

        const agentsResult = _.filter(this.store.users, (u:User) => {
            return u.firstName.concat(u.lastName).toLowerCase().trim().includes(this.searchContext);
        });

        this.users$.next(agentsResult as UserView[]);
    }

    handleSearchContext() {
        if (this.searchContext != null) {
            this.searchChipValue = this.searchContext;
            this.searchContext = null;
            this.showSearchContextChip = true;
        }            
    }

    removeSearchChip() {
        this.searchChipValue = null;
        this.showSearchContextChip = false;
    }

    toggleSortUsers() {
        const direction = this.sortAscending ? 'desc' : 'asc';
        this._filteredUsers = _.orderBy(this._filteredUsers, ['lastName', 'firstName'], [direction, 'asc']);
        this.users$.next(this._filteredUsers);
        this.sortAscending = !this.sortAscending;
    }

}
