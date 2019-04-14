import { User } from './user.model';

export interface UpdateAgentMetaData {
    user: User,
    updateUser: boolean,
    updateAgent: boolean,
    updateDetail: boolean,
}
