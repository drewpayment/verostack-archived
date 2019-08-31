import { Moment } from '@app/shared/moment-extensions';
import { ContactType } from './enums/contact-type.enum';


export interface Contact {
    contactId:number,
    clientId:number,
    contactType:ContactType,
    businessName?:string,
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

export interface ContactRequest {
    contact_id?: number,
    client_id?: number,
    contact_type?: ContactType,
    business_name?: string,
    first_name?: string,
    last_name?: string,
    middle_name?: string,
    prefix?: string,
    suffix?: string,
    ssn?: number,
    dob?: Date | string | Moment,
    street?: string,
    street2?: string,
    city?: string,
    state?: string, 
    zip?: string,
    phone?: number,
    fax?: number,
    email?: string
}
