import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IAgent, User} from '@app/models';
import {Observable, throwError, BehaviorSubject} from 'rxjs';
import {AuthService} from '@app/auth.service';
import {catchError, tap} from 'rxjs/operators';
import {ISalesPairing} from '@app/models/sales-pairings.model';
import {RoleType} from '@app/models/role.model';
import { environment } from '@env/environment';
import { Observable as ApolloOb } from 'apollo-link';
import { Buoy } from '@app/buoy/buoy';
import gql from 'graphql-tag';
import { QueryResult } from '@app/buoy/operations/query/query-result';
import { QueryError } from '@app/buoy/operations/query/query-error';

interface DataStore {
    agents: IAgent[];
}

@Injectable({
    providedIn: 'root'
})
export class AgentService {
    _agents:IAgent[];
    api: string;
    store: DataStore;
    graphql = environment.graphql;

    agents$ = new BehaviorSubject<IAgent[]>(this._agents);


    constructor(private auth: AuthService, private http: HttpClient, private buoy: Buoy) {
        this.api = this.auth.apiUrl + 'api' || '';
    }

    private _getAgents(): ApolloOb<QueryResult<IAgent[]> | QueryError> {
        return this.buoy.query<IAgent[]>(
            gql`
                {
                    agents {
                        agentId
                        firstName
                        lastName
                        clientId
                        managerId
                        isManager
                        isActive
                    }
                }
            `
        );
    }

    fetchGraphqlAgents() {
        this._getAgents().subscribe(resp => {
            this._agents = resp.data.agents;
            this.agents$.next(this._agents);
        });
    }

    /**
     * Gets a list of agents by the client id.
     *
     * @param clientId
     */
    getUserAgentsByClient(clientId: number): Observable<User[]> {
        const url = `${this.api}/clients/${clientId}/user-agents`;
        return this.http.get<User[]>(url).pipe(catchError(this.handleError));
    }

    getAgentsByClient(clientId: number): Observable<IAgent[]> {
        const url = `${this.api}/clients/${clientId}/agents`;
        return this.http.get<IAgent[]>(url)
            .pipe(
                tap(next => this._agents = next),
                catchError(this.handleError)
            );
    }

    getAgentByUser(clientId: number, userId: number): Observable<User> {
        return this.http
            .get<User>(`${this.api}/clients/${clientId}/users/${userId}/agents`)
            .pipe(catchError(this.handleError));
    }

    updateUserWithRelationships(clientId: number, user: User): Observable<User> {
        const url = `${this.api}/clients/${clientId}/users/${user.id}`;
        return this.http.post<User>(url, user).pipe(catchError(this.handleError));
    }

    checkUsernameAvailability(username: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.api}/usernames?u=${username}`).pipe(catchError(this.handleError));
    }

    /**
     * Return an array of sales pairings entities by agent id.
     *
     * @param agentId
     * @param clientId
     */
    getAgentSalesPairings(agentId: number, clientId: number): Observable<ISalesPairing[]> {
        return this.http
            .get<ISalesPairing[]>(`${this.api}/sales-pairings/clients/${clientId}/agents/${agentId}/sales-pairings`)
            .pipe(catchError(this.handleError));
    }

    getSalesPairingsByClient(clientId: number): Observable<ISalesPairing[]> {
        return this.http
            .get<ISalesPairing[]>(`${this.api}/sales-pairings/clients/${clientId}`)
            .pipe(catchError(this.handleError));
    }

    /**
     * Save a list of agent sales pairings.
     *
     * @param pairings
     * @param agentId
     */
    saveAgentSalesPairings(pairings: ISalesPairing[], agentId: number): Observable<ISalesPairing[]> {
        return this.http
            .post<ISalesPairing[]>(`${this.api}/sales-pairings/agents/${agentId}/sales-pairings`, {pairings: pairings})
            .pipe(catchError(this.handleError));
    }

    saveAgentSalesPairing(pairing: ISalesPairing, agentId: number): Observable<ISalesPairing> {
        const url =
            pairing.salesPairingsId > 0
                ? `${this.api}/agents/${agentId}/sales-pairings/${pairing.salesPairingsId}`
                : `${this.api}/agents/${agentId}/sales-pairings`;
        return this.http.post<ISalesPairing>(url, pairing).pipe(catchError(this.handleError));
    }

    deleteAgentSalesPairings(pairingId: number): Observable<void> {
        return this.http.delete<void>(`${this.api}/sales-pairings/${pairingId}`).pipe(catchError(this.handleError));
    }

    getRoleTypes(includeInactive: boolean = false): Observable<RoleType[]> {
        return this.http.get<RoleType[]>(`${this.api}/role-types?inactive=${includeInactive}`);
    }

    updateAgent(agent:IAgent):Observable<IAgent> {
        return this.http.post(this.api + '/agents/' + agent.agentId, agent);
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.log('Error occurred: ', error.error.message || error.message);
        } else {
            console.error(`Server returned error code ${error.status}: ${error.error}`);
        }
        return throwError('There was a network error. Please try again.');
    }
}
