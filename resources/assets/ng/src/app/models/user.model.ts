import { SessionUser } from './sessionuser.model';
import { IClient } from './client.model';
import { IRole } from './role.model';
import { IUserDetail } from '.';
import { IAgent } from '@app/models/agent.model';

export interface IUser {
  id?: number,
  firstName?: string,
  lastName?:string,
  username?:string,
  password?:string,
  email?: string,
  active?:boolean,
  session?:SessionUser,
  selectedClient?:IClient,
  hasOnboarding?:boolean,
  role?: IRole,
  createdAt?: any,
  updatedAt?: any,

  // RELATIONSHIPS
  clients?:IClient[],
  detail?:IUserDetail,
  agent?:IAgent
}

export class User implements IUser {
  constructor(u: IUser = null) {
    this.id = u == null ? null : u.id,
    this.firstName = u == null ? '' : u.firstName;
    this.lastName = u == null ? '' : u.lastName;
    this.username = u == null ? '' : u.username;
    this.email = u == null ? '' : u.email;
    this.session = u == null ? <SessionUser>{} : u.session;
    this.selectedClient = u == null ? <IClient>{} : u.selectedClient;
    this.hasOnboarding = u == null ? false : u.hasOnboarding;
    this.role = u == null ? <IRole>{} : u.role;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.clients = u == null || u.clients == null ? [<IClient>{}] : u.clients;
  }

  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  session: SessionUser;
  selectedClient: IClient;
  hasOnboarding: boolean;
  role: IRole;
  createdAt: Date;
  updatedAt: Date;
  clients: IClient[];
}

export interface IUserWithDetails {
  user: IUser,
  detail: IUserDetail
}
