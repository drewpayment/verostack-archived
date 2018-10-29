import { User } from '@app/models';


export interface OAuthResponse {
    token:string,
    user:User
}