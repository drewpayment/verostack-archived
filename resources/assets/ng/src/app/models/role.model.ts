import {Moment} from '@app/shared/moment-extensions';

export interface IUserRole {
    id: number;
    type: string;
    active: boolean;
}

export interface IRole {
    userId:number;
    // role:number|RoleType;
    role:number,
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
    USER = 1,
    SUPERVISOR,
    MANAGER,
    REGIONAL_MANAGER,
    HUMAN_RESOURCES,
    COMPANY_ADMIN,
    SYSTEM_ADMIN
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
    user: UserRole.USER,
    supervisor: UserRole.SUPERVISOR,
    manager: UserRole.MANAGER,
    regionalManager: UserRole.REGIONAL_MANAGER, 
    humanResources: UserRole.HUMAN_RESOURCES,
    companyAdmin: UserRole.COMPANY_ADMIN,
    systemAdmin: UserRole.SYSTEM_ADMIN
}
