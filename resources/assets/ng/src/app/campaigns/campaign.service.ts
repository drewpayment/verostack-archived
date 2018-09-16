import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICampaign } from '../models';
import { AuthService } from '../auth.service';

@Injectable()
export class CampaignService {
  private apiUrl:string;
  campaign:ICampaign;

  constructor(private http:HttpClient, private auth:AuthService) {
    this.apiUrl = this.auth.apiUrl + 'api/' || '';
  }

  // TODO: do I even use this anywhere?
  // getCampaignsByClient(clientId:number): Promise<any> {
  //   return this.http.get(this.apiUrl + 'clients/' + clientId + '/campaigns').toPromise();
  // }

  /**
   * Returns all active campaigns accessible by the current user
   *
   * @param clientId
   */
  getCampaigns(clientId:number, activeOnly:boolean = null):Promise<ICampaign[]> {
    const url = activeOnly == null
      ? `${this.apiUrl}campaigns/clients/${clientId}/active`
      : `${this.apiUrl}campaigns/clients/${clientId}/active/${activeOnly}`;
    return this.http.get<ICampaign[]>(url).toPromise();
  }

  /**
   * Checks to see if a campaign already exists for this clients by name.
   *
   * @param clientId
   * @param name
   */
  checkCampaignNameAvailability(clientId:number, name:string):Promise<boolean> {
    return this.http.get<boolean>(this.apiUrl + 'campaigns/clients/' + clientId + '/campaign-name', {
      params: {
        name: name
      }
    }).toPromise();
  }

  /**
   * Save a new/existing campaign entity.
   *
   * @param clientId
   * @param campaignId
   * @param dto
   */
  saveCampaign(clientId:number, campaignId:number, dto:ICampaign):Promise<ICampaign> {
    let url = campaignId != null
      ? this.apiUrl + 'campaigns/clients/' + clientId + '/campaigns/' + campaignId
      : this.apiUrl + 'campaigns/clients/' + clientId + '/campaigns';

    return this.http
      .post<ICampaign>(
        url,
        { dto: dto }
      ).toPromise();
  }

}
