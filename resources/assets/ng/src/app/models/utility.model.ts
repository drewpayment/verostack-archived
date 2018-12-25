import { User, ICampaign } from '.';
import { Moment } from 'moment';

export interface Utility {
    utilityId:number,
    campaignId:number|null,
    commodity:string,
    agentCompanyId:number|null,
    agentCompanyName:string,
    utilityName:string,
    meterNumber:number|null,
    classification:string,
    price:number|null,
    unitOfMeasure:string,
    term:number|null,
    isActive:boolean,
    modifiedBy?:number,
    createdAt?:Date|string|Moment,
    updatedAt?:Date|string|Moment,
    user?:User,
    campaign?:ICampaign
}