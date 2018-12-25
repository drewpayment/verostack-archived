import {Moment} from 'moment';
import { Utility } from './utility.model';

export interface ICampaign {
    campaignId: number;
    clientId: number;
    name: string;
    active: boolean;
    createdAt?: Date | Moment | string | null;
    updatedAt?: Date | Moment | string | null;
    compensation?: number | null;
    mdDetails?: string;
    mdOnboarding?: string;
    mdOther?: string;
    utilities?:Utility[]
}
