import { Moment } from 'moment';
import { User } from './user.model';
import { DailySale } from './daily-sale.model';

export interface ImportModel {
    importModelId: number,
    shortDesc: string,
    fullDesc: string,
    map:DailySale,
    userId:number,
    createdAt:Date|string|Moment,
    updatedAt:Date|string|Moment,
    deletedAt:Date|string|Moment,

    // relationship
    user:User
}
