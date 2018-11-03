import { Moment } from "moment";

export interface IUserDetail {
  userDetailId?: number,
  userId?: number,
  street?: string,
  street2?: string,
  city?: string,
  state?: string,
  zip?: number,
  ssn?: number,
  phone?: number,
  birthDate?: Date | Moment | string,
  bankRouting?: number,
  bankAccount?: number,
  saleOneId?: number,
  saleOneCampaignId?: number,
  saleTwoId?: number,
  saleTwoCampaignId?: number,
  saleThreeId?: number,
  saleThreeCampaignId?: number,
  createdAt?: Date,
  updatedAt?: Date
}
