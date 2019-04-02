import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAgent, User } from '@app/models';

import { environment } from 'environments/environment';
import { ISalesPairing } from '@app/models/sales-pairings.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RoleType } from '@app/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  private api = environment.apiUrl + 'api/';

  constructor(private http:HttpClient) { }

  /**
   * TODO: Refactor to return Observable<IAgent[]>
   * Get all agents by active status.
   *
   * @param activeOnly
   */
  getAgents(activeOnly:boolean = true):Promise<IAgent[]> {
    return this.http.get(this.api + 'agents/statuses/' + activeOnly)
      .toPromise()
      .then((agents:IAgent[]) => {
        return agents;
      })
      .catch(e => {
        console.dir(e);
        return null;
      });
  }

  /**
   * Return a list of agents by the client id.
   * 
   * @param clientId 
   */
  getAgentsByClient(clientId:number):Observable<User[]> {
    const url = `${this.api}clients/${clientId}/agents`;
    return this.http.get<User[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * updates an agent entity
   *
   * @param agent
   */
  updateAgent(agent:IAgent):Promise<IAgent> {
    return this.http.post(this.api + 'agents/' + agent.agentId, agent)
      .toPromise()
      .then((agent:IAgent) => {
        return agent;
      });
  }

  /**
   * Return an array of sales pairings entities by agent id.
   *
   * @param agentId
   * @param clientId
   */
  getAgentSalesPairings(agentId:number, clientId:number):Promise<ISalesPairing[]> {
    return this.http.get(this.api + 'clients/' + clientId + '/agents/' + agentId + '/sales-pairings')
      .toPromise()
      .then((salesPairings:ISalesPairing[]) => {
        return salesPairings;
      });
  }

  /**
   * Save a list of agent sales pairings.
   *
   * @param pairings
   * @param agentId
   */
  saveAgentSalesPairings(pairings:ISalesPairing[], agentId:number):Promise<ISalesPairing[]> {
    return this.http.post(this.api + 'agents/' + agentId + '/sales-pairings', { pairings: pairings })
      .toPromise()
      .then((pairings:ISalesPairing[]) => {
        return pairings;
      });
  }

  deleteAgentSalesPairings(pairingId:number):Promise<void> {
    return this.http.delete(this.api + 'sales-pairings/' + pairingId)
      .toPromise()
      .then(() => { return; });
  }

  getRoleTypes(includeInactive:boolean = false):Observable<RoleType[]> {
      return this.http.get<RoleType[]>(`${this.api}role-types?inactive=${includeInactive}`);
  }

  private handleError(error:HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      // client side network error
      console.log('Error occurred: ', error.error.message || error.message);
    } else {
      // backend returned server error
      console.error(`
        Server returned error code ${error.status}: ${error.error}
      `)
    }
    return throwError('There was a network error. Please try again.');
  }
}
