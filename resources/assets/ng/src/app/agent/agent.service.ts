import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IAgent, IUser} from '@app/models';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '@app/auth.service';
import { catchError } from 'rxjs/operators';
import { ISalesPairing } from '@app/models/sales-pairings.model';

interface DataStore {
    agents: IAgent[];
}

@Injectable({
    providedIn: 'root'
})
export class AgentService {
    api:string;
    store:DataStore;
    constructor(private auth:AuthService, private http: HttpClient) {
        this.api = this.auth.apiUrl + 'api' || '';
    }

    /**
     * Gets a list of agents by the client id.
     * 
     * @param clientId
     */
    getAgentsByClient(clientId:number):Observable<IUser[]> {
        let url = `${this.api}/clients/${clientId}/agents`;
        return this.http.get<IUser[]>(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateUserWithRelationships(clientId:number, user:IUser):Observable<IUser> {
        let url = `${this.api}/clients/${clientId}/users/${user.id}`;
        return this.http.post<IUser>(url, user)
            .pipe(
                catchError(this.handleError)
            );
    }

    checkUsernameAvailability(username:string):Observable<boolean> {
        return this.http.get<boolean>(`${this.api}/usernames?u=${username}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Return an array of sales pairings entities by agent id.
     *
     * @param agentId
     * @param clientId
     */
    getAgentSalesPairings(agentId:number, clientId:number):Observable<ISalesPairing[]> {
        return this.http.get<ISalesPairing[]>(`${this.api}/sales-pairings/clients/${clientId}/agents/${agentId}/sales-pairings`)
            .pipe(
                catchError(this.handleError)
            );
    }

    getSalesPairingsByClient(clientId:number):Observable<ISalesPairing[]> {
        return this.http.get<ISalesPairing[]>(`${this.api}/sales-pairings/clients/${clientId}`)
            .pipe(
                catchError(this.handleError)
            );
    }
    
    /**
     * Save a list of agent sales pairings.
     *
     * @param pairings
     * @param agentId
     */
    saveAgentSalesPairings(pairings:ISalesPairing[], agentId:number):Observable<ISalesPairing[]> {
        return this.http.post<ISalesPairing[]>(`${this.api}/sales-pairings/agents/${agentId}/sales-pairings`, { pairings: pairings })
            .pipe(
                catchError(this.handleError)
            );
    }

    saveAgentSalesPairing(pairing:ISalesPairing, agentId:number):Observable<ISalesPairing> {
        const url = pairing.salesPairingsId > 0 
            ? `${this.api}/agents/${agentId}/sales-pairings/${pairing.salesPairingsId}`
            : `${this.api}/agents/${agentId}/sales-pairings`;
        return this.http.post<ISalesPairing>(url, pairing)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteAgentSalesPairings(pairingId:number):Observable<void> {
        return this.http.delete<void>(`${this.api}/sales-pairings/${pairingId}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error:HttpErrorResponse) {
        if(error.error instanceof ErrorEvent) {
            console.log('Error occurred: ', error.error.message || error.message);
        } else {
            console.error(`Server returned error code ${error.status}: ${error.error}`);
        }
        return throwError('There was a network error. Please try again.');
    }
}
