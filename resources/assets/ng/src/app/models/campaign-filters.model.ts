import { IState } from '@app/shared/models/state.model';

export type CampaignFilterActiveStatus = 'active' | 'inactive' | 'all';

export enum CompOperator {
    Equals, LessThan, GreaterThan, LessThanEqualTo, GreaterThanEqualTo
}

export interface CampaignFilters {
    activeStatus: CampaignFilterActiveStatus,
    compensation:number,
    compOperator:CompOperator,
    location:IState
}