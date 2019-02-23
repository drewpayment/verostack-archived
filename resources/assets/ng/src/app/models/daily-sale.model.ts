import { Moment } from "moment";
import { Remark, IAgent } from "@app/models";
import { Contact } from './contact.model';
import { SaleStatus } from './sale-status.model';

export enum PaidStatusType {
  unpaid,
  paid,
  chargeback,
  repaid
}

export interface DailySale {
  dailySaleId?:number,
  agentId:number,
  clientId:number,
  campaignId:number,
  utilityId?:number,
  contactId?:number,
  podAccount:number,
  firstName?:string, // remove when contact is fully implemented
  lastName?:string, // remove when contact is fully implemented
  street?:string, // remove when contact is fully implemented
  street2?:string, // remove when contact is fully implemented
  city?:string, // remove when contact is fully implemented
  state?:string, // remove when contact is fully implemented
  zip?:number, // remove when contact is fully implemented
  status:number,
  paidStatus:number,
  payCycleId?:number,
  saleDate:Date | string | Moment,
  paidDate?:Date | string | Moment,
  chargeDate?:Date | string | Moment,
  repaidDate?:Date | string | Moment,
  lastTouchDate?:Date | string | Moment,
  notes?:string
  remarks:Remark[],
  agent?:IAgent,
  contact?:Contact,
  saleStatus?:SaleStatus
}
