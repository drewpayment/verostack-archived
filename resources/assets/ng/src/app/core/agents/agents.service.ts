import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAgent } from '@app/models';

import { environment } from 'environments/environment';
import { ISalesPairing } from '@app/models/sales-pairings.model';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  private api = environment.apiUrl + 'api/';

  constructor(private http:HttpClient) { }

  /**
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
}
