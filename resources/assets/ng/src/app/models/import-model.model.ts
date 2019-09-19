import { Moment } from 'moment';
import { User } from './user.model';
import { ICampaign } from './campaign.model';

export interface ImportModel {
    importModelId: number,
    clientId: number,
    shortDesc: string,
    fullDesc: string,
    map: any,
    userId: number,
    campaignId: number,
    matchByAgentCode: boolean,
    splitCustomerName: boolean,
    createdAt?:Date|string|Moment,
    updatedAt?:Date|string|Moment,
    deletedAt?:Date|string|Moment,

    // relationship
    user?:User
    campaign?: ICampaign
}

export interface ImportModelMap {
    key: string,
    value: string,
    fieldType: DailySaleMapType, 
}

export enum DailySaleMapType {
    salesAgentId, // this is the sales ID that the client uses... NOT SQL agentId
    salesAgentName,
    podAccount,
    utilityName,
    saleDate,
    contactFullName,
    contactFirstName,
    contactMiddleName,
    contactLastName,
    contactBusinessName,
    contactPrefix,
    contactSuffix,
    contactSsn,
    contactDob,
    contactStreet,
    contactStreet2,
    contactCity,
    contactState,
    contactZip,
    contactPhone,
    contactEmail,
    saleStatus
}

export const DailySaleFields = [
    'Sales Agent ID',
    'Sales Agent Name',
    'Account No',
    'Utility Name',
    'Sale Date',
    'Customer Full Name',
    'Customer First Name',
    'Customer Middle Name',
    'Customer Last Name',
    'Business Name',
    'Customer Prefix',
    'Customer Suffix',
    'Customer SSN',
    'Date of Birth',
    'Address',
    'Apt/Unit/#',
    'City',
    'State',
    'Zip',
    'Phone',
    'Email',
    'Sale Status'
];

export interface SpreadsheetSerialized {
    columns: SpreadsheetSerializeColumns;
    data: SpreadsheetSerializeData[];
    format: SpreadsheetSerializeFormat;
    styles: SpreadsheetSerializeStyle[];
}

export interface SpreadsheetSerializeColumns {
    [key: string]: any;
}

export interface SpreadsheetSerializeData {
    cell: string;
    css: string;
    value: string;
}

export interface SpreadsheetSerializeFormat {
    [key: string]: any;
}

export interface SpreadsheetSerializeStyle {
    [key: string]: any;
}
