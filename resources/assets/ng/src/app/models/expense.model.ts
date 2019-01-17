
export interface IExpense {
  expenseId: number,
  payrollDetailsId: number,
  agentId: number,
  title: string,
  description: string,
  amount: number,
  modifiedBy: number,
  createdAt: Date,
  updatedAt: Date
}
