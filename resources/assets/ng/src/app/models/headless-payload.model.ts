import { PayrollDetails } from './payroll-detail.model';
import { User } from './user.model';
import { DailySale } from './daily-sale.model';
import { ISalesPairing } from './sales-pairings.model';

export interface HeadlessPayload {
    detail:PayrollDetails,
    user:User,
    sales:DailySale[],
    pairings:ISalesPairing[]
}