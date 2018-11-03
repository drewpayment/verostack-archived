import { IAgentSale } from ".";


export interface IPayrollMap {
  agentId: number,
  agentName: string,
  entries: IAgentSale[]
}
