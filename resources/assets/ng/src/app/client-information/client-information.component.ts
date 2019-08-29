import { Component, OnInit } from '@angular/core';
import { User, IClient, IClientOption, SaleStatus } from '../models/index';
import { Validators, NgForm, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MessageService } from '../message.service';
import { ClientService } from './client.service';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { UserService } from '../user-features/user.service';
import { SessionService } from '@app/session.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { AddSaleStatusDialog } from '@app/client-information/dialogs/add-sale-status.component';

@Component({
    selector: 'app-client-information',
    templateUrl: './client-information.component.html',
    styleUrls: ['./client-information.component.scss']
})
export class ClientInformationComponent implements OnInit {
    user: User;
    clients: IClient[];
    client: IClient;
    editMode: boolean;
    editOptions: boolean;
    displayColumns: string[] = ['name', 'isActive'];
    saleStatusForm: FormGroup;
    saleStatuses$: BehaviorSubject<SaleStatus[]> = new BehaviorSubject([]);

    tooltipPosition = 'after';

    allStatuses: SaleStatus[];
    showAllStatuses: boolean;
    hasInactiveStatuses: boolean;
    options:IClientOption;
    useExistingContacts = new FormControl();

    states: string[] = [
        'AL',
        'AK',
        'AZ',
        'AR',
        'CA',
        'CO',
        'CT',
        'DE',
        'FL',
        'GA',
        'HI',
        'ID',
        'IL',
        'IN',
        'IA',
        'KS',
        'KY',
        'LA',
        'ME',
        'MD',
        'MA',
        'MI',
        'MN',
        'MS',
        'MO',
        'MT',
        'NE',
        'NV',
        'NH',
        'NJ',
        'NM',
        'NY',
        'NC',
        'ND',
        'OH',
        'OK',
        'OR',
        'PA',
        'RI',
        'SC',
        'SD',
        'TN',
        'TX',
        'UT',
        'VT',
        'VA',
        'WA',
        'WV',
        'WI',
        'WY'
    ];

    constructor(
        private msg: MessageService,
        private clientService: ClientService,
        private userService: UserService,
        private session: SessionService,
        private fb: FormBuilder,
        private dailog: MatDialog
    ) {
        this.client = this.setEmptyClient();
    }

    ngOnInit() {
        
        this.session.getUserItem().subscribe(user => {
            this.user = user;
            this.client = this.user.sessionUser.client;
            this.clients = this.user.clients;

            this.clientService.getClientOptions().subscribe(options => {
                this.options = options;
                this.useExistingContacts.setValue(this.options.useExistingContacts);
            });

            this.clientService.getSaleStatuses(this.client.clientId).subscribe(statuses => {
                this.allStatuses = statuses;
                this.evaluateShowAllStatus();

                const activeStatuses = statuses.filter(s => s.isActive);
                this.saleStatuses$.next(activeStatuses);

                this.createSaleStatusForm();

                const defaults = statuses.filter(s => s.clientId < 1);

                if (defaults.length > 0) {
                    this.clientService.setDefaultStatuses(this.client.clientId, defaults).subscribe(results => {
                        this.saleStatuses$.next(results);
                    });
                }
            });
        });
    }

    filterStatuses(): void {
        const filteredStatusList = this.showAllStatuses
            ? this.allStatuses
            : _.filter(this.allStatuses, (s: SaleStatus) => {
                  return s.isActive;
              });
        this.saleStatuses$.next(filteredStatusList);
    }

    save(f: NgForm) {
        if (f.valid) {
            if (this.client.clientId > 0) {
                this.clientService.updateClient(this.client);
                this.editMode = !this.editMode;
                if (this.client.clientId > 0) f.reset();
            }
        }
    }

    cancel(f: NgForm) {
        this.client = this.user.sessionUser.client;
        this.editMode = !this.editMode;
        f.reset();
    }

    changeEditMode(f: NgForm): void {
        if (!f.dirty) {
            this.editMode = !this.editMode;
        } else {
            f.reset();
        }
    }

    onStateChange($evt) {
        this.client.state = $evt.value;
    }

    changeOptionsMode() {
        this.editOptions = !this.editOptions;
    }

    saveOptions() {
        this.clientService.updateClientOptions(this.user.sessionUser.client.options);
    }

    updateActiveStatus(saleStatus: SaleStatus): void {
        this.clientService.updateSaleStatus(saleStatus.clientId, saleStatus).subscribe(item => {
            this.msg.addMessage('Successfully updated!', 'dismiss', 2500);

            this.allStatuses.map(s => {
                if (s.saleStatusId != item.saleStatusId) return s;
                s = item;
                return s;
            });
            this.evaluateShowAllStatus();
        });
    }

    showAddSaleStatusDialog(): void {
        const ref = this.dailog.open(AddSaleStatusDialog, {
            width: '400px'
        });

        ref.afterClosed().subscribe(result => {
            if (result == null) return;
            const dto: SaleStatus = {
                saleStatusId: null,
                name: result.name,
                isActive: result.isActive,
                clientId: this.client.clientId
            };
            this.clientService.createSaleStatus(this.client.clientId, dto).subscribe(result => {
                this.msg.addMessage('Successfully saved status.', 'dismiss', 3000);
                this.allStatuses.push(result);
                this.allStatuses = _.sortBy(this.allStatuses, ['name']);
                this.evaluateShowAllStatus();
            });
        });
    }

    changeUseExistingContacts(event:MatCheckboxChange) {
        this.useExistingContacts.setValue(event.checked);
        this.options.useExistingContacts = this.useExistingContacts.value;

        this.clientService.updateUseExistingContacts(this.options)
            .subscribe(op => {
                this.options = op;
                this.msg.addMessage('Updated mobile app settings.', 'dismiss', 2500);
            });
    }

    private evaluateShowAllStatus(): void {
        this.hasInactiveStatuses =
            _.find(this.allStatuses, (s: SaleStatus) => {
                return !s.isActive;
            }) != null;
        this.showAllStatuses = this.hasInactiveStatuses ? this.showAllStatuses : false;
    }

    private setEmptyClient(): IClient {
        return {
            clientId: 0,
            active: false,
            city: null,
            name: null,
            options: <IClientOption>{
                clientId: 0,
                hasOnboarding: false,
                optionsId: 0
            },
            phone: null,
            state: null,
            street: null,
            taxid: null,
            zip: null
        };
    }

    private createSaleStatusForm(): FormGroup {
        const statuses = this.saleStatuses$.getValue();
        let formArray: FormGroup[] = [];
        if (statuses.length > 0) {
            statuses.forEach(s => {
                formArray.push(this.createSaleFormGroup(s));
            });
            formArray.push(this.createSaleFormGroup());
        } else {
            formArray.push(this.createSaleFormGroup());
        }
        return this.fb.group({
            statuses: formArray
        });
    }

    private createSaleFormGroup(status: SaleStatus = null): FormGroup {
        status = status == null ? { saleStatusId: null, name: null, isActive: false, clientId: null } : status;
        return this.fb.group({
            name: this.fb.control(status.name || '', [Validators.required]),
            isActive: this.fb.control(status.isActive)
        });
    }
}
