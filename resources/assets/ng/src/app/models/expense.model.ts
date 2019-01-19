import { Moment } from '@app/shared/moment-extensions';

export interface IExpense {
  expenseId: number,
  payrollDetailsId: number,
  agentId: number,
  title: string,
  description: string,
  amount: number,
  expenseDate:Date|Moment|string,
  modifiedBy?: number,
  createdAt?:Date|Moment|string,
  updatedAt?:Date|Moment|string
}
