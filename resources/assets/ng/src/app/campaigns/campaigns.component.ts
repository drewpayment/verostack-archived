import {Component, OnInit, Output} from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {NewCampaignDialogComponent} from '@app/campaigns/new-campaign-dialog/new-campaign-dialog.component';
import {EventEmitter} from 'events';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {User, ICampaign} from '@app/models';
import {SessionService} from '@app/session.service';
import {CampaignService} from '@app/campaigns/campaign.service';
import {MessageService} from '@app/message.service';
import {UserRole} from '@app/models/role.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CampaignFilters, CompOperator } from '@app/models/campaign-filters.model';
import { CampaignFilterDialogComponent } from '@app/campaigns/campaign-filter-dialog/campaign-filter-dialog.component';

interface DataStore {
    campaigns: ICampaign[];
}

@Component({
    selector: 'app-campaigns',
    templateUrl: './campaigns.component.html',
    styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
    private readonly defaultFilter:CampaignFilters = {
        activeStatus: 'all',
        compOperator: CompOperator.Equals,
        compensation: null,
        location: { name: 'Michigan', abbreviation: 'MI' }
    }   
    filter:CampaignFilters;
    filterActive:boolean;
    numFilters:number = 0;
    store:DataStore = {} as DataStore;
    activeTab: number;
    tableData: ICampaign[];

    activeTableColumns = ['name', 'campaignId', 'active', 'createdAt', 'updatedAt'];
    activeTableSource: ICampaign[] = [];
    campaigns: Subject<ICampaign[]> = new Subject<ICampaign[]>();

    inactiveTableSource: ICampaign[] = [];

    floatBtnIsOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    floatIsOpen: Observable<boolean>;

    user: User;

    constructor(
        private dialog: MatDialog,
        private session: SessionService,
        private service: CampaignService,
        private msg: MessageService,
        private sanitizer:DomSanitizer
    ) {
        this.filter = this.defaultFilter;
    }

    ngOnInit() {
        this.session.showLoader();
        this.session.userItem.subscribe((next: User) => {
            if (next == null) return;
            this.user = next;

            // if the user isn't at least a company admin, then we are going to send them back to the page they
            // were prior to reaching this point...
            if (this.user.role.role < UserRole.companyAdmin)
                this.session.navigateBack().then(result => {
                    console.dir(result);
                });

            this.service
                .getCampaigns(this.user.sessionUser.sessionClient, false)
                .then((campaigns: ICampaign[]) => {
                    this.store.campaigns = campaigns;
                    this.campaigns.next(campaigns);
                    this.session.hideLoader();

                    // TODO: remove after restructuring
                    this.tableData = campaigns;
                    this.sortCampaignsByStatus();
                    
                })
                .catch(this.msg.showWebApiError);
        });

        this.floatIsOpen = this.floatBtnIsOpen$.asObservable();
    }

    switchActiveStatus(item: ICampaign, index:number): void {
        this.session.showLoader();
        index = _.findIndex(this.store.campaigns, { campaignId:item.campaignId });
        let pendingCampaign = this.store.campaigns[index];

        pendingCampaign.active = !pendingCampaign.active;

        this.service.saveCampaign(this.user.sessionUser.sessionClient, pendingCampaign.campaignId, pendingCampaign)
            .then(updated => {
                this.session.hideLoader();
                this.store.campaigns.map(c => c.campaignId === item.campaignId ? updated : c);
                this.campaigns.next(this.store.campaigns);
            })
            .catch(this.msg.showWebApiError);
    }

    addCampaign(): void {
        this.floatBtnIsOpen$.next(true);
        // show dialog with form...
        let ref = this.dialog.open(NewCampaignDialogComponent, {
            width: '650px',
            data: {
                user: this.user
            }
        });

        ref.afterClosed().subscribe((result: ICampaign) => {
            this.floatBtnIsOpen$.next(false);
            if (result == null) return;

            // do whatever updates that need to happen right here after adding a new campaign
            this.tableData.push(result);
            this.sortCampaignsByStatus();
            this.updateActiveTab();
        });
    }

    editCampaign(item: ICampaign): void {
        let ref = this.dialog.open(NewCampaignDialogComponent, {
            width: '650px',
            data: {
                user: this.user,
                campaign: item
            }
        });

        ref.afterClosed().subscribe((result: ICampaign) => {
            if (result == null) return;

            for (let i = 0; i < this.tableData.length; i++) {
                // if the campaign ids don't match, skip to the next iteration
                if (this.tableData[i].campaignId != result.campaignId) continue;

                this.tableData[i] = result;
                this.sortCampaignsByStatus();
                this.updateActiveTab();
            }
        });
    }

    setFilters():void {
        this.dialog.open(CampaignFilterDialogComponent, {
            width: '350px',
            data: {
                filter: this.filter
            }
        })
        .afterClosed()
        .subscribe(result => {
            if(result == null) return;
            this.filter = result;
            this.updateCampaignsByFilter();
        });
    }

    updateCampaignsByFilter():void {
        let result:ICampaign[];
        this.numFilters = 0;

        if(this.filter.activeStatus === 'all') {
            result = this.store.campaigns;
            this.numFilters++;
        } else {

            if(this.filter.activeStatus === 'active') {
                result = _.filter(this.store.campaigns, (c:ICampaign) => {
                    return c.active;
                });
                this.numFilters++;
            } 
            
            if (this.filter.activeStatus === 'inactive') {
                result = _.filter(this.store.campaigns, (c:ICampaign) => {
                    return !c.active;
                });
                this.numFilters++;
            }

        }

        if(this.filter.compensation > 0) {
            if(this.filter.compOperator == CompOperator.Equals) {
                result = _.filter(result, (c:ICampaign) => {
                    return c.compensation === this.filter.compensation;
                });
            } else if(this.filter.compOperator == CompOperator.GreaterThan) {
                result = _.filter(result, (c:ICampaign) => {
                    return c.compensation > this.filter.compensation;
                });
            } else if(this.filter.compOperator == CompOperator.GreaterThanEqualTo) {
                result = _.filter(result, (c:ICampaign) => {
                    return c.compensation >= this.filter.compensation;
                });
            } else if(this.filter.compOperator == CompOperator.LessThan) {
                result = _.filter(result, (c:ICampaign) => {
                    return c.compensation < this.filter.compensation;
                });
            } else if(this.filter.compOperator == CompOperator.LessThanEqualTo) {
                result = _.filter(result, (c:ICampaign) => {
                    return c.compensation <= this.filter.compensation;
                });
            }
            this.numFilters++;
        }

        // if(this.filter.location != null) {
            // add this... 
            // result = _.filter(result, (c:ICampaign) => {
            //     return c.
            // });
        // }
        if(result != null) this.campaigns.next(result);
        this.filterActive = true;
    }

    clearFilters():void {
        this.filterActive = false;
        this.campaigns.next(this.store.campaigns);
        this.filter = this.defaultFilter;
        this.numFilters = 0;
    }

    sanitize(value:string):SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }

    // PRIVATE METHODS

    private sortCampaignsByStatus(): void {
        this.activeTableSource = [];
        this.inactiveTableSource = [];

        for (let i = 0; i < this.tableData.length; i++) {
            let item = this.tableData[i];
            if (item.active) {
                this.activeTableSource.push(item);
            } else {
                this.inactiveTableSource.push(item);
            }
        }

        this.activeTableSource = _.sortBy(this.activeTableSource, ['name']);
        this.inactiveTableSource = _.sortBy(this.inactiveTableSource, ['name']);
    }

    private updateActiveTab(): void {
        if (this.activeTableSource.length === 0 && this.inactiveTableSource.length > 0) {
            this.activeTab = 1;
        } else if (this.inactiveTableSource.length === 0 && this.activeTableSource.length > 0) {
            this.activeTab = 0;
        }
    }
}

const TABLE_DATA: ICampaign[] = [
    {campaignId: 1, clientId: 0, name: 'Consumers', active: true, createdAt: new Date(), updatedAt: new Date()},
    {campaignId: 2, clientId: 0, name: 'DTE', active: true, createdAt: new Date(), updatedAt: new Date()},
    {campaignId: 3, clientId: 0, name: 'Spark', active: false, createdAt: new Date(), updatedAt: new Date()}
];
