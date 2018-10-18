import { Moment } from '@app/shared/moment-extensions';

export interface IUserRole {
  id: number,
  type: string,
  active: boolean
}

export interface IRole {
  role: number,
  user_id: number,
  created_at: number,
  updated_at: number
}

export interface RoleType {
    id:number,
    type:string,
    active:boolean,
    createdAt?:Date | Moment | string,
    updatedAt?:Date | Moment | string
}

export enum UserRole {
  user,
  supervisor,
  manager,
  regionalManager,
  humanResources,
  companyAdmin,
  systemAdmin
}
