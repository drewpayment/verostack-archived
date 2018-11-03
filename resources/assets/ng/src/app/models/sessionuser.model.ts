import { IClient } from '@app/models/client.model';

export interface SessionUser {
  id:number,
  userId:number,
  sessionClient:number,
  createdAt?:string,
  updatedAt?:string,
  client?:IClient
}
