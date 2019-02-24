import { IAgent } from './agent.model';

export interface IOverride {
  overrideId:number,
  agentId:number,
  payrollDetailsId:number,
  units:number,
  amount:any,
  agent?:IAgent
}
