import { Moment } from 'moment';
import { PayCycle } from './pay-cycle.model';
import { ICampaign } from './campaign.model';
import { Utility } from './utility.model';
import { User } from './user.model';
import { PayrollDetails } from './payroll-detail.model';

export interface Payroll {
    payrollId:number,
    payCycleId:number,
    campaignId:number,
    utilityId:number,
    weekEnding?:Date|Moment|string,
    isReleased:boolean,
    releaseDate?:Date|Moment|string,
    isAutomated:boolean,
    automatedRelease?:Date|Moment|string,
    modifiedBy?:number,
    createdAt?:Date|Moment|string,
    updatedAt?:Date|Moment|string,

    /** RELATIONSHIPS */
    payCycle?:PayCycle,
    campaign?:ICampaign,
    utility?:Utility,
    modifiedByUser?:User

    /** DTO USE ONLY - NOT RELATIONSHIPS */
    details?:PayrollDetails[]
}