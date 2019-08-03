import { Moment } from 'moment';
import { User } from './user.model';

export interface ImportModel {
    importModelId: number,
    clientId: number,
    shortDesc: string,
    fullDesc: string,
    map:any,
    userId:number,
    createdAt?:Date|string|Moment,
    updatedAt?:Date|string|Moment,
    deletedAt?:Date|string|Moment,

    // relationship
    user?:User
}
