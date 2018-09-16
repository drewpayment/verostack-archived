import { IAgentSale, IOverride, IExpense } from '.';
import { Moment } from 'moment';

export interface InvoiceDto {
  invoiceId: number,
  agentId: number,
  campaignId: number,
  agentSales: IAgentSale[],
  overrides: IOverride[],
  expenses: IExpense[],
  issueDate: string | Moment | Date,
  weekEnding: string | Moment | Date,
}

export interface IInvoice {
  invoiceId: number,
  agentId: number,
  campaignId: number,
  issueDate: string | Moment | Date,
  weekEnding: string | Moment | Date,
  modifiedBy: number | null,
  createdAt: Date,
  updatedAt: Date
}
