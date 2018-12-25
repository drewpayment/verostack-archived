import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {ICampaign, Utility} from '../models';
import {AuthService} from '../auth.service';
import {throwError, Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CampaignService {
    private apiUrl: string;
    private api: string;
    private _campaign: ICampaign;
    get campaign(): ICampaign {
        return this._campaign;
    }
    set campaign(value: ICampaign) {
        this._campaign = value;
    }

    private _utility: Utility;
    get utility(): Utility {
        return this._utility;
    }
    set utility(value: Utility) {
        this._utility = value;
    }

    /** INTERNAL USE ONLY --- these are referenced on NewSaleComponent */
    _campaigns:ICampaign[];
    _utilities:Utility[];

    constructor(private http: HttpClient, private auth: AuthService) {
        this.apiUrl = this.auth.apiUrl + 'api/' || '';
        this.api = this.auth.apiUrl + 'api';
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
    getCampaigns(clientId: number, activeOnly: boolean = null): Promise<ICampaign[]> {
        const url =
            activeOnly == null
                ? `${this.apiUrl}campaigns/clients/${clientId}/active`
                : `${this.apiUrl}campaigns/clients/${clientId}/active/${activeOnly}`;
        return this.http.get<ICampaign[]>(url).toPromise();
    }

    getCampaign(clientId: number, campaignId: number): Observable<ICampaign> {
        const url = `${this.apiUrl}clients/${clientId}/campaigns/${campaignId}`;
        return this.http.get<ICampaign>(url);
    }

    getCampaignsByClient(clientId: number): Observable<ICampaign[]> {
        return this.http
            .get<ICampaign[]>(`${this.api}/campaigns/clients/${clientId}`)
            .pipe(
                tap(next => {
                    this._campaigns = next;
                    if(this._utilities == null)
                        this._utilities = [];
                    next.forEach(c => this._utilities.concat(c.utilities));
                }),
                catchError(this.handleError)
            );
    }

    /**
     * Get campaign entities by agent.
     *
     * @param clientId
     * @param agentId
     */
    getCampaignsByAgent(clientId: number, agentId: number): Observable<ICampaign[]> {
        const url = `${this.apiUrl}campaigns/clients/${clientId}/agents/${agentId}`;
        return this.http.get<ICampaign[]>(url).pipe(catchError(this.handleError));
    }

    /**
     * Checks to see if a campaign already exists for this clients by name.
     *
     * @param clientId
     * @param name
     */
    checkCampaignNameAvailability(clientId: number, name: string): Promise<boolean> {
        return this.http
            .get<boolean>(this.apiUrl + 'campaigns/clients/' + clientId + '/campaign-name', {
                params: {
                    name: name
                }
            })
            .toPromise();
    }

    /**
     * Save a new/existing campaign entity.
     *
     * @param clientId
     * @param campaignId
     * @param dto
     */
    saveCampaign(clientId: number, campaignId: number, dto: ICampaign): Promise<ICampaign> {
        let url =
            campaignId != null
                ? this.apiUrl + 'campaigns/clients/' + clientId + '/campaigns/' + campaignId
                : this.apiUrl + 'campaigns/clients/' + clientId + '/campaigns';

        return this.http.post<ICampaign>(url, {dto: dto}).toPromise();
    }

    getUtility(clientId: number, utilityId: number): Observable<Utility> {
        const url = `${this.apiUrl}clients/${clientId}/utilities/${utilityId}`;
        return this.http.get<Utility>(url).pipe(catchError(err => this.handleError(err)));
    }

    saveUtility(clientId: number, utility: Utility): Observable<Utility> {
        const url = utility.utilityId > 0
            ? `${this.apiUrl}clients/${clientId}/utilities/${utility.utilityId}`
            : `${this.apiUrl}clients/${clientId}/utilities`;
        return this.http.post<Utility>(url, utility)
            .pipe(catchError(err => this.handleError(err)));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // client side network error
            console.log('Error occurred: ', error.error.message || error.message);
        } else {
            // backend returned server error
            console.error(`
        Server returned error code ${error.status}: ${error.error}
      `);
        }
        return throwError('There was a network error. Please try again.');
    }
}
