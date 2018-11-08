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
    user,
    supervisor,
    manager,
    regionalManager,
    humanResources,
    companyAdmin,
    systemAdmin
}
