import { Moment } from "moment";

export interface IAgent {
  agentId?:number,
  userId?:number,
  firstName?:string,
  lastName?:string,
  managerId?:number,
  isManager?:boolean,
  isActive?:boolean,
  createdAt?:Date | Moment
}
