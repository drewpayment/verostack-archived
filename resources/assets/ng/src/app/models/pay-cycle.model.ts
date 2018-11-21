import { Moment } from 'moment';


export interface PayCycle {
    payCycleId:number,
    startDate:string | Moment,
    endDate:string | Moment,
    isPending:boolean,
    isClosed:boolean,
    createdAt?:string | Moment,
    updatedAt?:string | Moment
}