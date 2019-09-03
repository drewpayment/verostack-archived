
export interface ISalesPairing {
  salesPairingsId:number,
  agentId:number,
  campaignId:number,
  commission?:number|null,
  salesId:string,
  clientId:number
}
