import { SessionUser } from './sessionuser.model';
import { IClient } from './client.model';
import { IRole } from './role.model';
import { IUserDetail } from '.';
import { IAgent } from '@app/models/agent.model';
import { Moment } from '@app/shared/moment-extensions';

export interface User {
    active:boolean,
    clients?:IClient[],
    detail?:IUserDetail,
    email:string,
    firstName:string,
    id?:number,
    lastName:string,
    role?:IRole,
    sessionUser?:SessionUser,
    username:string,
    password?:string,
    createdAt?:any,
    udpatedAt?:any,
    agent?:IAgent
}