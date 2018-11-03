
export interface IExpense {
  expenseId: number,
  invoiceId: number,
  agentId: number,
  title: string,
  description: string,
  amount: number,
  modifiedBy: number,
  createdAt: Date,
  updatedAt: Date
}
