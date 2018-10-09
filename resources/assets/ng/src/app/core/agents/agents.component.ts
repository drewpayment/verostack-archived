import {Component, OnInit} from '@angular/core';
import {MessageService} from '@app/message.service';
import {UserService} from '@app/user-features/user.service';
import {SessionService} from '@app/session.service';
import {IUser, IAgent, IUserDetail, ICampaign} from '@app/models';
import {Observable, BehaviorSubject, ReplaySubject, Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators, AbstractControl, FormControl, FormArray} from '@angular/forms';
import {AgentsService} from '@app/core/agents/agents.service';
import {CampaignService} from '@app/campaigns/campaign.service';

import * as _ from 'lodash';
import * as moment from 'moment';
import {IUserDetailInfo} from '@app/models/user-detail-info.model';
import {MatDialog} from '../../../../node_modules/@angular/material';
import {AddAgentDialogComponent} from '@app/core/agents/dialogs/add-agent.component';
import {ISalesPairing} from '@app/models/sales-pairings.model';

@Component({
    selector: 'app-agents',
    templateUrl: './agents.component.html',
    styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
    user$: Observable<IUser>;
    user: IUser;
    campaigns: ICampaign[];
    detail$: Subject<IUserDetail> = new ReplaySubject<IUserDetail>(1);
    detail: IUserDetail;
    agents: IAgent[];
    form: FormGroup;
    detailForm: FormGroup;
    floatBtnIsOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    floatIsOpen: Observable<boolean>;

    editAgent: boolean = false;
    editingFirstName: string;
    editingLastName: string;
    editingAgent: IAgent;
    editingUser: IUser;
    managers: IAgent[];
    pairingsFormArray: FormArray;
    salesPairings: ISalesPairing[];
    pairingsIsOpened: boolean[];
    isIdOneOpened: boolean;
    isIdTwoOpened: boolean;
    isIdThreeOpened: boolean;
    selectedSaleOneCampaign: ICampaign;
    selectedSaleTwoCampaign: ICampaign;
    selectedSaleThreeCampaign: ICampaign;
    activePanel: number;
    isNotRemovingSalesPairing: boolean;
    constructor(
        private msg: MessageService,
        private userService: UserService,
        private session: SessionService,
        private fb: FormBuilder,
        private agentService: AgentsService,
        private campaignService: CampaignService,
        private dialog: MatDialog
    ) {
        this.pairingsIsOpened = [];
        this.isNotRemovingSalesPairing = true;
        this.createForm();
        this.user$ = this.session.getUserItem();

        this.activePanel = 0;
    }

    ngOnInit() {
        this.session.showLoader();
        this.session.userItem.subscribe((u: IUser) => {
            // do some security stuff here and redirect the user if somehow they found their
            // way to this page when they shouldn't have been...
            this.user = u;

            this.agentService.getAgents(false).then((agents: IAgent[]) => {
                this.managers = [];
                for (let i = 0; i < agents.length; i++) {
                    if (!agents[i].isManager) continue;
                    this.managers.push(agents[i]);
                }
                this.agents = agents;
                this.session.hideLoader();
            });

            this.campaignService
                .getCampaigns(u.selectedClient.clientId)
                .then(campaigns => {
                    this.campaigns = [];
                    for (let i = 0; i < campaigns.length; i++) {
                        if (campaigns[i].clientId != this.user.selectedClient.clientId && !campaigns[i].active)
                            continue;
                        this.campaigns.push(campaigns[i]);
                    }
                })
                .catch(this.msg.showWebApiError);
        });
        this.floatIsOpen = this.floatBtnIsOpen$.asObservable();
    }

    changeActiveStatus(agent: IAgent, event: any): void {
        agent.isActive = event.checked;
        this.agentService.updateAgent(agent).then(agent => {
            for (let i = 0; i < this.agents.length; i++) {
                if (this.agents[i].agentId !== agent.agentId) continue;
                this.agents[i] = agent;
            }
        });
    }

    addAgent(): void {
        this.floatBtnIsOpen$.next(true);

        const ref = this.dialog.open(AddAgentDialogComponent, {
            width: '600px',
            data: {user: this.user}
        });

        ref.afterClosed().subscribe((refreshAgents: boolean) => {
            if (refreshAgents) {
                this.agentService.getAgents(false).then((agents: IAgent[]) => {
                    this.managers = [];
                    for (let i = 0; i < agents.length; i++) {
                        if (!agents[i].isManager) continue;
                        this.managers.push(agents[i]);
                    }
                    this.agents = agents;
                    this.session.hideLoader();
                });
            }

            this.floatBtnIsOpen$.next(false);
        });
    }

    editAgentDetail(agent: IAgent): void {
        this.session.showLoader();
        this.editingFirstName = agent.firstName;
        this.editingLastName = agent.lastName;
        this.editingAgent = agent;

        this.editingUser = this.createEmptyUser();
        this.detail = this.detail || this.createEmptyUserDetail();

        this.agentService
            .getAgentSalesPairings(agent.agentId, this.user.selectedClient.clientId)
            .then(pairings => {
                this.salesPairings = pairings;
            })
            .catch(this.msg.showWebApiError);

        this.userService
            .getUser(agent.userId)
            .then(user => {
                this.editingUser = user;
                this.userService
                    .getUserDetailById(this.editingUser.id)
                    .then(detail => {
                        this.setViewValues(detail);
                        this.editAgent = true;
                        this.createDetailForm(agent);

                        this.session.hideLoader();
                    })
                    .catch(this.msg.showWebApiError);
            })
            .catch(this.msg.showWebApiError);
    }

    handleUserTabSave(): void {
        let userForm = this.detailForm.get('userInfo');
        let agentForm = this.detailForm.get('agentInfo');

        console.dir([userForm, agentForm]);

        if (userForm.dirty && userForm.valid) this.updateFormUserInfo(userForm);
        if (agentForm.dirty && agentForm.valid) this.updateFormAgentInfo(agentForm, userForm);
    }

    updateFormAgentInfo(agentForm: AbstractControl, userForm: AbstractControl): void {
        this.session.showLoader();
        let agent: IAgent = <IAgent>{
            agentId: this.editingAgent.agentId,
            userId: this.editingAgent.userId,
            firstName: agentForm.value.firstName,
            lastName: agentForm.value.lastName,
            isActive: !userForm.value.isActive,
            isManager: agentForm.value.isManager,
            managerId: agentForm.value.managerId
        };

        this.agentService
            .updateAgent(agent)
            .then(a => {
                this.editingAgent = a;
                for (let i = 0; i < this.agents.length; i++) {
                    if (this.agents[i].agentId != this.editingAgent.agentId) continue;
                    this.agents[i] = this.editingAgent;
                }
                this.resetAgentInfo(a);
                this.session.hideLoader();
                this.showStandardSuccessMessage();
            })
            .catch(this.msg.showWebApiError);
    }

    updateFormSaleInfo(): void {
        let saleInfo = this.detailForm.get('saleInfo');
        if (
            (saleInfo.value.saleOneCampaignId && !saleInfo.value.saleOneId) ||
            (saleInfo.value.saleTwoCampaignId && !saleInfo.value.saleTwoId) ||
            (saleInfo.value.saleThreeCampaignId && !saleInfo.value.saleThreeId) ||
            (saleInfo.value.saleOneId && !saleInfo.value.saleOneCampaignId) ||
            (saleInfo.value.saleTwoId && !saleInfo.value.saleTwoCampaignId) ||
            (saleInfo.value.saleThreeId && !saleInfo.value.saleThreeCampaignId)
        )
            return;

        this.session.showLoader(); // the form is valid, so let's show the loading animation

        this.detail.saleOneCampaignId = saleInfo.value.saleOneCampaignId;
        this.detail.saleTwoCampaignId = saleInfo.value.saleTwoCampaignId;
        this.detail.saleThreeCampaignId = saleInfo.value.saleThreeCampaignId;
        this.detail.saleOneId = saleInfo.value.saleOneId;
        this.detail.saleTwoId = saleInfo.value.saleTwoId;
        this.detail.saleThreeId = saleInfo.value.saleThreeId;

        this.userService
            .updateDetailSaleInfo(this.detail)
            .then(detail => {
                this.resetSaleInfoForm(detail);
                this.setViewValues(detail);
                this.session.hideLoader();
                this.showStandardSuccessMessage();
            })
            .catch(this.msg.showWebApiError);
    }

    updateAgentSalesPairings(): void {
        this.session.showLoader();
        let pairingsFormArray: FormArray = this.detailForm.get('pairings') as FormArray;

        // if form is invalid, DO NOT PASS GO, DO NOT COLLECT $200
        if (pairingsFormArray.invalid) return;
        let payLoad: ISalesPairing[] = [];

        for (let i = 0; i < pairingsFormArray.controls.length; i++) {
            let d = this.salesPairings[i];
            let p = pairingsFormArray.controls[i].value;
            // if there isn't a campaign or sales value for this pairing, we are going to skip
            // to the next pairing because it won't be valid when inserted into db
            if (p.campaignId == null || p.salesId == null) continue;

            payLoad.push({
                salesPairingsId: d != null ? d.salesPairingsId : null,
                agentId: this.editingAgent.agentId,
                campaignId: p.campaignId as number,
                salesId: p.salesId as number,
                clientId: this.user.selectedClient.clientId
            });
        }

        this.agentService
            .saveAgentSalesPairings(payLoad, this.editingAgent.agentId)
            .then(pairings => {
                this.msg.addMessage('Successfully updated!', 'dismiss', 6000);
                this.salesPairings = pairings;
                this.detailForm.controls.pairings = this.createSalesPairings();
            })
            .catch(this.msg.showWebApiError);
    }

    removeAgentSalesPairing(pairing: ISalesPairing) {
        this.session.showLoader();
        let idx: number = this.salesPairings
            .map((p: ISalesPairing) => {
                return p.salesPairingsId;
            })
            .indexOf(pairing.salesPairingsId);

        this.agentService
            .deleteAgentSalesPairings(pairing.salesPairingsId)
            .then(() => {
                this.msg.addMessage('Deleted successfully.', 'dismiss', 6000);
                this.salesPairings.splice(idx, 1);
                this.pairingsIsOpened = [];
                _.forEach(this.salesPairings, (p: ISalesPairing) => {
                    if (p.campaignId != null) this.pairingsIsOpened.push(true);
                });
                (<FormArray>this.detailForm.controls.pairings).removeAt(idx);
            })
            .catch(this.msg.showWebApiError);
    }

    updateFormDetailInfo(): void {
        this.session.showLoader();
        let detailInfo = this.detailForm.get('detailInfo');
        let formattedDob = moment(detailInfo.value.birthDate).format('YYYY-MM-DD');

        let detail: IUserDetail = <IUserDetail>{
            userDetailId: this.detail.userDetailId,
            street: detailInfo.value.street,
            street2: detailInfo.value.street2,
            city: detailInfo.value.city,
            state: detailInfo.value.state,
            zip: detailInfo.value.postalCode,
            phone: detailInfo.value.phone,
            birthDate: formattedDob,
            bankRouting: detailInfo.value.bankRouting,
            bankAccount: detailInfo.value.bankAccount,
            ssn: detailInfo.value.ssn,
            userId: this.detail.userId || this.user.id
        };

        this.userService
            .saveDetailEntity(detail)
            .then(detail => {
                this.setViewValues(detail);
                this.resetDetailInfoForm(detail);
                this.session.hideLoader();
                this.showStandardSuccessMessage();
            })
            .catch(this.msg.showWebApiError);
    }

    updateFormUserInfo(userForm: AbstractControl): void {
        this.session.showLoader();
        let user: IUser = <IUser>{
            id: this.editingAgent.userId,
            firstName: this.editingAgent.firstName,
            lastName: this.editingAgent.lastName,
            email: userForm.value.email,
            username: userForm.value.username,
            active: userForm.value.canLogin
        };
        this.userService
            .updateUserEntity(user)
            .then(user => {
                this.user = user;
                this.resetUserInfoForm(user);
                this.session.hideLoader();
                this.showStandardSuccessMessage();
            })
            .catch(this.msg.showWebApiError);
    }

    cancelUserAndDetailEditing(): void {
        this.editAgent = !this.editAgent;
        this.detailForm.reset();
    }

    private showStandardSuccessMessage(): void {
        this.msg.addMessage('Saved successfully.', 'dismiss', 6000);
    }

    /**
     * Set user detail variables values.
     *
     * @param detail
     */
    private setViewValues(detail: IUserDetail): void {
        this.detail = detail;
        this.detail$.next(detail);
    }

    createForm(): void {
        this.form = this.fb.group({
            agents: this.fb.array([])
        });
    }

    createDetailForm(agent: IAgent): void {
        this.detailForm = this.fb.group({
            agentInfo: this.fb.group({
                firstName: this.fb.control(agent.firstName || '', [Validators.required]),
                lastName: this.fb.control(agent.lastName || '', [Validators.required]),
                managerId: this.fb.control(agent.managerId || ''),
                isManager: this.fb.control(agent.isManager || '')
            }),
            userInfo: this.fb.group({
                username: this.fb.control(this.user.username || '', [Validators.required]),
                email: this.fb.control(this.user.email || '', [Validators.required]),
                canLogin: this.fb.control(this.user.active || ''),
                isActive: this.fb.control(!agent.isActive)
            }),
            detailInfo: this.fb.group({
                street: this.fb.control(this.detail.street || '', [Validators.required]),
                street2: this.fb.control(this.detail.street2 || ''),
                city: this.fb.control(this.detail.city || '', [Validators.required]),
                state: this.fb.control(this.detail.state || '', [Validators.required]),
                postalCode: this.fb.control(this.detail.zip || '', [Validators.required]),
                birthDate: this.fb.control(this.detail.birthDate || '', [Validators.required]),
                phone: this.fb.control(this.detail.phone || '', [Validators.required]),
                ssn: this.fb.control(this.detail.ssn || ''),
                bankRouting: this.fb.control(this.detail.bankRouting || ''),
                bankAccount: this.fb.control(this.detail.bankAccount || '')
            }),
            pairings: this.createSalesPairings()
        });
    }

    createSalesPairings(): FormArray {
        this.pairingsIsOpened = [];
        let result: FormArray = this.fb.array([]);

        for (let i = 0; i < this.salesPairings.length; i++) {
            let p = this.salesPairings[i];
            this.pairingsIsOpened.push(true);
            result.push(
                this.fb.group({
                    campaignId: this.fb.control(p.campaignId),
                    salesId: this.fb.control(p.salesId),
                    clientId: this.fb.control(p.clientId)
                })
            );
        }

        this.salesPairings.push({
            salesPairingsId: null,
            agentId: null,
            salesId: null,
            clientId: null,
            campaignId: null
        });
        result.push(
            this.fb.group({
                campaignId: this.fb.control(''),
                salesId: this.fb.control(''),
                clientId: this.fb.control('')
            })
        );
        this.pairingsIsOpened.push(false);
        return result;
    }

    /**
     * Returns FormArray pairings object from detailForm that's usable on template.
     */
    get pairings(): FormArray {
        return this.detailForm.get('pairings') as FormArray;
    }

    getPairingOpenedStatus(index: number): boolean {
        return this.pairingsIsOpened[index];
    }

    setPairingOpenedStatus(index: number, value: boolean): void {
        this.pairingsIsOpened[index] = value;
    }

    getCampaignName(campaignId: number): string {
        let campaign = (<ICampaign>_.find(this.campaigns, (c: ICampaign) => {
            return campaignId == c.campaignId;
        }));
        return campaign != null ? campaign.name : '';
    }

    createEmptyUser(): IUser {
        return <IUser>{
            username: null,
            email: null,
            active: false
        };
    }

    createEmptyUserDetail(): IUserDetail {
        return <IUserDetail>{
            street: null,
            street2: null,
            city: null,
            state: null,
            zip: null,
            birthDate: null,
            phone: null,
            ssn: null,
            saleOneId: null,
            saleOneCampaignId: null,
            saleTwoId: null,
            saleTwoCampaignId: null,
            saleThreeId: null,
            saleThreeCampaignId: null,
            bankRouting: null,
            bankAccount: null
        };
    }

    createEmptyCampaign(): ICampaign {
        return <ICampaign>{
            campaignId: null,
            clientId: null,
            name: null,
            active: true
        };
    }

    removeExistingSalesPairing(saleKey: string, campaignKey: string): void {
        this.isNotRemovingSalesPairing = false;
        this.detail[saleKey] = null;
        this.detail[campaignKey] = null;
        this.detail$.next(this.detail);
        this.resetSaleInfoForm(this.detail);
    }

    private resetAgentInfo(agent: IAgent): void {
        this.detailForm.setControl(
            'agentInfo',
            this.fb.group({
                firstName: agent.firstName,
                lastName: agent.lastName,
                managerId: agent.managerId,
                isManager: agent.isManager
            })
        );
    }

    private resetUserInfoForm(user: IUser): void {
        this.detailForm.setControl(
            'userInfo',
            this.fb.group({
                username: this.fb.control(this.user.username || '', [Validators.required]),
                email: this.fb.control(this.user.email || '', [Validators.required]),
                canLogin: this.fb.control(this.user.active || '')
            })
        );
    }

    private resetDetailInfoForm(detail: IUserDetail): void {
        this.detailForm.setControl(
            'detailInfo',
            this.fb.group({
                street: this.fb.control(this.detail.street || '', [Validators.required]),
                street2: this.fb.control(this.detail.street2 || ''),
                city: this.fb.control(this.detail.city || '', [Validators.required]),
                state: this.fb.control(this.detail.state || '', [Validators.required]),
                postalCode: this.fb.control(this.detail.zip || '', [Validators.required]),
                birthDate: this.fb.control(this.detail.birthDate || '', [Validators.required]),
                phone: this.fb.control(this.detail.phone || '', [Validators.required]),
                ssn: this.fb.control(this.detail.ssn || ''),
                bankRouting: this.fb.control(this.detail.bankRouting || ''),
                bankAccount: this.fb.control(this.detail.bankAccount || '')
            })
        );
    }

    private resetSaleInfoForm(detail: IUserDetail): void {
        this.detailForm.setControl(
            'saleInfo',
            this.fb.group({
                saleOneId: this.fb.control(this.detail.saleOneId || ''),
                saleOneCampaignId: this.fb.control(this.detail.saleOneCampaignId || ''),
                saleTwoId: this.fb.control(this.detail.saleTwoId || ''),
                saleTwoCampaignId: this.fb.control(this.detail.saleTwoCampaignId || ''),
                saleThreeId: this.fb.control(this.detail.saleThreeId || ''),
                saleThreeCampaignId: this.fb.control(this.detail.saleThreeCampaignId || '')
            })
        );
    }
}
