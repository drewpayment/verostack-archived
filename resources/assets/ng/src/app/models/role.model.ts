import {Moment} from '@app/shared/moment-extensions';

export interface IUserRole {
    id: number;
    type: string;
    active: boolean;
}

export interface IRole {
    userId:number;
    role:RoleType | number;
    isSalesAdmin:boolean,
    createdAt?:number;
    updatedAt?:number;
}

export interface RoleType {
    id: number;
    type: string;
    active: boolean;
    createdAt?: Date | Moment | string;
    updatedAt?: Date | Moment | string;
}

export enum UserRole {
    user = 1,
    supervisor,
    manager,
    regionalManager,
    humanResources,
    companyAdmin,
    systemAdmin
}

export interface IRoleType {
    user:UserRole,
    supervisor:UserRole,
    manager:UserRole,
    regionalManager:UserRole,
    humanResources:UserRole,
    companyAdmin:UserRole,
    systemAdmin:UserRole
}

export const Role:IRoleType = {
    user: UserRole.user,
    supervisor: UserRole.supervisor,
    manager: UserRole.manager,
    regionalManager: UserRole.regionalManager, 
    humanResources: UserRole.humanResources,
    companyAdmin: UserRole.companyAdmin,
    systemAdmin: UserRole.systemAdmin
}
