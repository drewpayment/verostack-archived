import {Component, OnInit, OnChanges, ChangeDetectorRef, AfterViewInit, AfterViewChecked} from '@angular/core';
import {NgForm} from '@angular/forms';

import {User, IUserDetail, IWeather, IOnboarding, IClient, ICampaign} from '../models';

import * as moment from 'moment';

import {WeatherService} from '../weather.service';
import {UserService} from '../user-features/user.service';
import {MessageService} from '../message.service';

import {LoadingSpinnerService} from '../loading-spinner/loading-spinner.service';
import {CampaignService} from '../campaigns/campaign.service';
import {SessionService} from '../session.service';
import {Observable, of} from 'rxjs';
import {UserRole} from '@app/models/role.model';

@Component({
    selector: 'my-information',
    templateUrl: './my-information.component.html',
    styleUrls: ['./my-information.component.scss']
})
export class MyInformationComponent implements OnInit, AfterViewChecked {
    user: User;
    user$: Observable<User>;
    detail$: Observable<IUserDetail>;
    detail: IUserDetail = <IUserDetail>{};
    weather: IWeather;
    minTemp: string;
    maxTemp: string;
    editProfile = false;
    editDetails:boolean;
    joinDate: string;
    welcome: string;
    hasOnboarding = false;
    onboarding: IOnboarding;

    client: IClient = <IClient>{};

    ssn = '123456789';

    campaigns: ICampaign[] = [];
    allCampaigns: ICampaign[] = [];

    constructor(
        private weatherApi: WeatherService,
        private userService: UserService,
        private msg: MessageService,
        private spinner: LoadingSpinnerService,
        private campaignService: CampaignService,
        private session: SessionService,
        private cd:ChangeDetectorRef
    ) {
        this.detail$ = this.userService.userDetail$.asObservable();
    }

    ngOnInit() {
        this.session.showLoader();
        this.session.getUserItem().subscribe(user => {
            if (user == null) return;
            this.user$ = of(user);
            this.user = user;

            /** set onboarding options */
            this.hasOnboarding =
                user.sessionUser.client.options != null && user.role.role >= UserRole.companyAdmin
                    ? user.sessionUser.client.options.hasOnboarding
                    : false;

            this.client = user.sessionUser.client;
            this.welcome = user.firstName;
            this.joinDate = moment(user.createdAt.date).format('MMMM Do, YYYY');

            this.campaignService
                .getCampaigns(this.user.sessionUser.sessionClient)
                .then((campaigns: ICampaign[]) => {
                    this.allCampaigns = campaigns;
                    this.session.hideLoader();
                })
                .catch(this.msg.showWebApiError);
        });
    }

    ngAfterViewChecked() {
        
        // ExpressionChangedAfterItHasBeenCheckedError
        this.cd.detectChanges();
    }

    changeEditMode(f: NgForm): void {
        if (!f.dirty) {
            this.editProfile = !this.editProfile;
        } else {
            f.reset();
        }
    }

    changeOnboardingEditMode(f: NgForm): void {
        if (!f.dirty) {
            this.editDetails = !this.editDetails;
        } else {
            f.reset();
        }
    }

    save(f: NgForm) {
        this.spinner.show();
        // if account numbers are null, make them zeros to be inserted into db
        this.formatBankAccountNumbers();

        this.userService.updateUser(this.user, this.detail).subscribe();
        f.reset();
        this.editProfile = !this.editProfile;
        this.msg.addMessage('Saved successfully.', 'dismiss', 6000);
    }

    // need to finish this
    cancel(f: NgForm): void {
        this.userService.reloadUser();
        this.editProfile = !this.editProfile;
    }

    cancelDetails(f: NgForm): void {
        this.userService.reloadUserDetail();
        this.editDetails = !this.editDetails;
    }

    saveOnboarding(f: NgForm) {
        console.dir(f);
    }

    clearId(saleIdName: string, campaignName: string): void {
        this.detail[saleIdName] = null;
        this.detail[campaignName] = null;
    }

    private resetUserFormFields(f: NgForm, user: any) {
        for (var key in f.value) {
            if (!f.value.hasOwnProperty(key)) continue;
            var obj = f.form.controls[key];
            if (!obj.dirty) continue;
            this.user[key] = user[key];
            obj.markAsUntouched();
        }
    }

    private formatBankAccountNumbers(pageLoad: boolean = false) {
        if (pageLoad) {
            this.detail.bankRouting = this.detail.bankRouting === 0 ? null : this.detail.bankRouting;
            this.detail.bankAccount = this.detail.bankAccount === 0 ? null : this.detail.bankAccount;
        } else {
            this.detail.bankRouting = this.detail.bankRouting ? this.detail.bankRouting : 0;
            this.detail.bankAccount = this.detail.bankAccount ? this.detail.bankAccount : 0;
        }
    }

    private setEmptyUserDetail(): IUserDetail {
        return {
            userDetailId: null,
            userId: null,
            street: null,
            street2: null,
            city: null,
            state: null,
            zip: null,
            phone: null,
            ssn: null,
            birthDate: null,
            bankRouting: null,
            bankAccount: null,
            saleOneId: null,
            saleTwoId: null,
            saleThreeId: null,
            createdAt: null,
            updatedAt: null
        };
    }
}
