import { Moment } from 'moment';
import { Payroll } from './payroll.model';
import { IAgent } from './agent.model';
import { User } from './user.model';

export interface PayrollDetails {
    payrollDetailsId:number,
    payrollId:number,
    agentId:number,
    sales:number,
    taxes:number,
    grossTotal:number,
    netTotal:number,
    modifiedBy?:number,
    createdAt?:Date|Moment|string,
    updatedAt?:Date|Moment|string,

    /** RELATIONSHIPS */
    payroll?:Payroll,
    agent?:IAgent,
    modifiedByUser?:User
}