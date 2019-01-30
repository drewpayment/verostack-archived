import {Component, OnInit, AfterViewInit, AfterContentInit, TemplateRef, ViewChild, ComponentRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PayCycle} from '@app/models/pay-cycle.model';
import {FormGroup, FormBuilder} from '@angular/forms';
import { SessionService } from '@app/session.service';
import { User, DailySale, IAgent, PaidStatusType } from '@app/models';
import { Subject, Observable } from 'rxjs';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MatSelectionList, MatListOption, MatSelectionListChange, MatSelectChange, MatButtonToggleChange, MatDialog } from '@angular/material';
import * as _ from 'lodash';
import { MessageService } from '@app/message.service';
import { PayCycleService } from '../../pay-cycle.service';
import { ConfirmUnpaidSelectionDialogComponent } from '../confirm-unpaid-selection-dialog/confirm-unpaid-selection-dialog.component';

@Component({
    selector: 'vs-edit-pay-cycle',
    templateUrl: './edit-pay-cycle.component.html',
    styleUrls: ['./edit-pay-cycle.component.scss']
})
export class EditPayCycleComponent implements OnInit {
    user:User;
    form: FormGroup;
    _cycle:PayCycle;
    salesLoaded:boolean = false;
    private _sales:DailySale[];
    sales$:Subject<DailySale[]> = new Subject<DailySale[]>();
    @ViewChild('sales') public salesList:MatSelectionList;
    selectedSales:DailySale[];
    agentsFilter:IAgent[];
    hideSelectedOptions:boolean = false;


    constructor(
        private session:SessionService, 
        private service: PayCycleService, 
        private fb: FormBuilder,
        private router:Router,
        private dialog:MatDialog,
        private msg:MessageService
    ) {}

    ngOnInit() {
        this._cycle = this.service.cycle;
        this.initPage();
    }

    isSelectedSale(sale:DailySale):boolean {
        if(sale == null) return false;
        const saleDate:Moment = moment(sale.saleDate);
        return saleDate.isBetween(this._cycle.startDate, this._cycle.endDate, null, '[]');
    }

    toggleSelectAll(event:MatButtonToggleChange) {
        this.salesList.options.forEach((item, i, a) => {
            item.selected = event.source.checked;
        });
    }

    private initPage():void {
        if(this.salesLoaded) return;

        if(this._cycle == null) {
            this.router.navigate(['admin/pay']);
            return;
        }

        this.session.getUserItem().subscribe(u => {
            this.user = u;
            this.service.getPayCycleSales(
                this.user.sessionUser.sessionClient, 
                <string>this._cycle.startDate, 
                <string>this._cycle.endDate,
                this._cycle.payCycleId
            ).subscribe(sales => {
                this._sales = sales;
                this.sales$.next(sales);
                this.salesLoaded = true;

                this.handleSelectionChanges();
                this.buildAgentFilter();
            });
        })
    }

    private createForm(): void {
        this.form = this.fb.group({});
    }

    private handleSelectionChanges() {
        this.salesList.selectionChange.subscribe((changes:MatSelectionListChange) => {
            this.selectedSales = changes.source.selectedOptions.selected.map((option:MatListOption) => {
                return option.value as DailySale;
            });
        });
    }

    private confirmUnpaidSelection(sales:DailySale[]):void {
        this.dialog.open(ConfirmUnpaidSelectionDialogComponent, {
            autoFocus: false,
            width: '30vw',
            data: {
                sales: sales
            }
        })
        .afterClosed()
        .subscribe((confirmed:boolean) => {
            if(confirmed)
                this.handleConfirmedSave(sales);
        });
    }

    private buildAgentFilter() {
        let agents:IAgent[] = [];
        this._sales.forEach((s, i, a) => {
            if(_.includes(_.map(agents, a => a.agentId), s.agent.agentId)) return;
            agents.push(s.agent);
        });
        this.agentsFilter = agents;
    }

    filterSalesByAgent(event:MatSelectChange):void {
        if(event == null || event.value == null || event.value == "") {
            this.sales$.next(this._sales);
            return;
        }
        const filteredSales:DailySale[] = this._sales.filter(s => {
            return s.agentId == (<IAgent>event.value).agentId;
        });
        this.sales$.next(filteredSales);
    }

    salePaidStatusDisplayText(sale:DailySale):string {
        if(sale.paidStatus == PaidStatusType.unpaid)
            return 'Sale is unpaid.';
        if(sale.paidStatus == PaidStatusType.paid)
            return 'Sale has been paid.';
        if(sale.paidStatus == PaidStatusType.chargeback)
            return 'Sale has been reversed and charged back.';
        if(sale.paidStatus == PaidStatusType.repaid)
            return 'Sale has been repaid.';
    }

    saveSalesList() {
        this.filterSalesByAgent(null);

        const sales = this.salesList.selectedOptions.selected.map(val => val.value);
        const needsConfirmation:DailySale[] = sales.filter((s:DailySale) => s.paidStatus == PaidStatusType.unpaid || s.paidStatus == PaidStatusType.chargeback);

        if(needsConfirmation.length)
            this.confirmUnpaidSelection(sales);
        else 
            this.handleConfirmedSave(sales);
    }

    handleConfirmedSave(sales:DailySale[]) {
        const salesIds = sales.map(s => s.dailySaleId);

        this._sales.forEach((s, i, a) => {
            if(salesIds.includes(s.dailySaleId))
                a[i].payCycleId = this._cycle.payCycleId;
        });

        this.service.updateDailySaleWithPayCycle(this.user.sessionUser.sessionClient, this._cycle.payCycleId, this._sales)
            .subscribe(sales => {
                this.msg.addMessage('Saved successfully!', 'dismiss', 1500);
                setTimeout(() => this.router.navigate(['admin/pay']), 1500);
            });
    }
}
