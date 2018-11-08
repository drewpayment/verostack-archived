import { Moment } from "moment";
import { ISalesPairing } from '@app/models/sales-pairings.model';
import { IRole } from '@app/models/role.model';

export interface IAgent {
  agentId?:number,
  userId?:number,
  firstName?:string,
  lastName?:string,
  managerId?:number,
  isManager?:boolean,
  isActive?:boolean,
  createdAt?:Date | Moment,
  pairings?:ISalesPairing[],
  role?:IRole
}
