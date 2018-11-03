import { Moment } from '@app/shared/moment-extensions';


export interface Contact {
    contactId:number,
    clientId:number,
    firstName:string,
    lastName:string,
    middleName?:string,
    prefix?:string,
    suffix?:string,
    ssn?:number,
    dob?:Date | string | Moment,
    street:string,
    street2?:string,
    city:string,
    state:string,
    zip:number,
    phone?:number,
    email?:string,
    fax?:number
}