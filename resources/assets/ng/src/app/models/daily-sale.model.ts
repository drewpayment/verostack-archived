import { Moment } from "moment";
import { Remark, IAgent, ICampaign } from "@app/models";
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
  saleStatus?:SaleStatus,
  campaign?:ICampaign,

  // UI ONLY PROPERTIES 
  readonly?:boolean
}

export interface DailySaleRequest {
    daily_sale_id?: number,
    agent_id?: number,
    client_id?: number,
    campaign_id?: number,
    utility_id?: number,
    contact_id?: number,
    pod_account?: number,
    first_name?: string,
    last_name?: string,
    street?: string,
    street2?: string,
    city?: string,
    state?: string,
    zip?: string,
    status?: number,
    paid_status?: number,
    pay_cycle_id?: number,
    has_geo?: Boolean,
    sale_date?: Date | string | Moment,
    paid_date?: Date | string | Moment,
    charge_date?: Date | string | Moment,
    repaid_date?: Date | string | Moment,
    last_touch_date?: Date | string | Moment,
    notes?: string
}
