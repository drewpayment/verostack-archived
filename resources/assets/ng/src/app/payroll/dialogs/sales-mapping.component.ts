import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IAgentSale, IPayrollMap } from '../../models';

import * as _ from 'lodash';
import * as moment from 'moment';

interface IMappingHeader {
  agentName: string,
  saleDate: string,
  firstName: string,
  lastName: string,
  street: string,
  city: string,
  state: string,
  zip: string,
  status: string,
  amount: string
}

interface IOptionPairing {
  key: string,
  value: string,
  index: number
}

@Component({
  selector: 'sales-mapping',
  templateUrl: 'sales-mapping.component.html',
  styleUrls: ['sales-mapping.component.scss']
})
export class SalesMappingComponent {
  mappedItem: IPayrollMap;
  options: string[];
  optionPairs: IOptionPairing[] = [];

  dict: any = {};
  result: IAgentSale[] = [];
  mappings: IMappingHeader;
  rows: IAgentSale[];

  dateFormat: string = 'M-D-YYYY';

  constructor(public dialogRef: MatDialogRef<SalesMappingComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.rows = data.rows;
    this.mappedItem = <IPayrollMap>{
      agentId: null,
      agentName: null,
      entries: []
    };
    this.mappings = {
      agentName: null,
      saleDate: null,
      firstName: null,
      lastName: null,
      street: null,
      city: null,
      state: null,
      zip: null,
      status: null,
      amount: null
    };
    _.forEach(data.headers, (opt: string, idx: any) => {
      let key = opt.replace(/ /g, '');
      let value = opt.substring(0, 1).toUpperCase() + opt.substring(1);
      this.optionPairs.push({ key: key, value: value, index: idx });
    });
    this.optionPairs.push({ key: null, value: '--- No Pairing ---', index: null });
  }

  closeDialog(): void {
    _.forEach(this.rows, (row: IAgentSale, i: number) => {
      let obj = <IAgentSale>{
        agentSalesId: null,
        agentId: null,
        invoiceId: null,
        agentName: null,
        saleDate: null,
        firstName: null,
        lastName: null,
        address: null,
        city: null,
        state: null,
        postalCode: null,
        statusType: null,
        amount: null
      };
      for(let h in this.mappings) {
        if(this.mappings[h] !== null) {
          let mapIndex = _.find(this.optionPairs, { 'key': this.mappings[h] }).index;
          if(h == 'status') {
            obj[h] = row[mapIndex].match(/accept/gi) !== null ? 'true' : 'false';
          } else if (h === 'saleDate') {
            obj[h] = moment(row[mapIndex], this.dateFormat).format('YYYY-MM-DD');
          } else {
            obj[h] = row[mapIndex];
          }
        }
      }
      if(Object.keys(obj).length > 0) this.result.push(obj);
    });

    this.mappedItem.entries = this.result;

    this.dialogRef.close(this.mappedItem);
  }

}
