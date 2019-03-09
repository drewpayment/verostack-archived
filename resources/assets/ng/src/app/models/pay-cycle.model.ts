import { Moment } from 'moment';
import { Payroll } from './payroll.model';


export interface PayCycle {
    payCycleId:number,
    startDate:string | Moment,
    endDate:string | Moment,
    isPending:boolean,
    isClosed:boolean,
    isLocked:boolean,
    createdAt?:string | Moment,
    updatedAt?:string | Moment,

    // DTO ONLY 
    payrolls?:Payroll[]
}