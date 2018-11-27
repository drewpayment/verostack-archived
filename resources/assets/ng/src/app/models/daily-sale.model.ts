import { Moment } from "moment";
import { Remark, IAgent } from "@app/models";

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
  podAccount:number,
  firstName:string,
  lastName:string,
  street:string,
  street2:string,
  city:string,
  state:string,
  zip:number,
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
  agent?:IAgent
}
