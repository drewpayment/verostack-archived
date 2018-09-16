import { Moment } from "moment";
import { User } from "@app/models/user.model";

export interface Remark {
  remarkId:number,
  dailySaleId?:number,
  description:string,
  modifiedBy?:number,
  createdAt?:string|Date|Moment,
  updatedAt?:string|Date|Moment,
  user?:User
}
