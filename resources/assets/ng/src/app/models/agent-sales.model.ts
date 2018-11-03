import * as moment from 'moment';

export interface IAgentSale {
  agentSalesId: number,
  agentName?: string,
  invoiceId: number,
  agentId: number,
  saleDate: string,
  firstName: string,
  lastName: string,
  address: string,
  city: string,
  state: string,
  postalCode: string,
  statusType: number,
  amount: number,
  note: string,
  createdAt?: Date,
  updatedAt?: Date
}

export class AgentSale implements IAgentSale {
  agentSalesId = null;
  agentName = null;
  invoiceId = null;
  agentId = null;
  saleDate = null;
  firstName = null;
  lastName = null;
  address = null;
  city = null;
  state = null;
  postalCode = null;
  statusType = null;
  amount = null;
  note = null;
  createdAt = null;
  updatedAt = null;

  constructor(values:string[] = null) {

    if(Array.isArray(values) && values.length > 7) {
      this.saleDate = moment(values[0], 'MM-DD-YYYY').format('YYYY-MM-DD');
      this.firstName = values[1];
      this.lastName = values[2];
      this.address = values[3];
      this.city = values[4];
      this.state = values[5] != null ? values[5].toUpperCase() : values[5];
      this.postalCode = values[6];
      this.statusType = (values[7].toLowerCase().replace(' ', '').indexOf('accept') > -1).toString();
      this.amount = this.statusType == 'true' ? values[8] : 0;
    }
    return this;

  }
}
