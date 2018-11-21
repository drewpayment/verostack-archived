import {Component, OnInit, AfterViewInit, AfterContentInit, TemplateRef, ViewChild, ComponentRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PayCycle} from '@app/models/pay-cycle.model';
import {PayCycleService} from '@app/pay-cycle/pay-cycle.service';
import {FormGroup, FormBuilder} from '@angular/forms';
import { SessionService } from '@app/session.service';
import { User, DailySale, IAgent } from '@app/models';
import { Subject, Observable } from 'rxjs';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MatSelectionList, MatListOption, MatSelectionListChange, MatSelectChange, MatButtonToggleChange } from '@angular/material';
import * as _ from 'lodash';

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
        private router:Router
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
                )
                .subscribe(sales => {
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

    private buildAgentFilter() {
        let agents:IAgent[] = [];
        this._sales.forEach((s, i, a) => {
            if(_.includes(_.map(agents, a => a.agentId), s.agent.agentId)) return;
            agents.push(s.agent);
        });
        this.agentsFilter = agents;
    }

    filterSalesByAgent(event:MatSelectChange):void {
        if(event.value == null || event.value == "") {
            this.sales$.next(this._sales);
            return;
        }
        const filteredSales:DailySale[] = this._sales.filter(s => {
            return s.agentId == (<IAgent>event.value).agentId;
        });
        this.sales$.next(filteredSales);
    }
}
