import { IOnboarding } from ".";

export interface IClient {
  clientId: number,
  name: string,
  street: string,
  city: string,
  state: string,
  zip: number,
  phone: number,
  taxid: number,
  options: IClientOption,
  active: boolean,
  modifiedBy?: number,
  deletedAt?: Date,
  createdAt?: Date,
  updatedAt?: Date
}

export interface IClientOption {
  optionsId: number,
  clientId: number,
  hasOnboarding: boolean
}

