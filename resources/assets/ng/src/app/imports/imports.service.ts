import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImportModel, Utility, ICampaign, HttpErrorResponse, User, Graphql } from '@app/models';
import { environment } from '@env/environment';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { SessionService } from '@app/session.service';
import { shareReplay, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ImportsService {

    graphql = environment.graphql;
    api = environment.apiUrl + 'api';

    campaigns: Observable<ICampaign[]>;
    utilities: Observable<Utility[]>;

    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private session: SessionService, private router: Router) { 
        this.session.getUserItem().subscribe(user => {
            if (!user) return;
            this.user.next(user);
        });
    }

    /**
     * Get all ImportModels.
     */
    getImportModels():Observable<ImportModel[]> {
        return this.http.post<Graphql<ImportModel[]>>(this.graphql, {
                query: `{importModels {importModelId client {name clientId} shortDesc campaignId matchByAgentCode splitCustomerName
                    fullDesc map userId user{id firstName lastName username active} createdAt updatedAt}}`
            })
            .pipe(
                map((result) => {
                    return result.data.importModels;
                })
            );
    }

    /**
     * Used to save new OR update existing ImportModels.
     */
    saveImportModel(model: ImportModel):Observable<ImportModel> {
        const url = `${this.api}/import-models`;
        return this.http.post<ImportModel>(url, model);
    }

    fetchCampaigns() {
        const sub = this.user.subscribe(user => {
            const clientId = user.selectedClient != null 
                ? user.selectedClient.clientId
                : user.sessionUser.sessionClient;
            const url = `${this.api}/campaigns/clients/${clientId}/active/true`;
            this.campaigns = this.http.get<ICampaign[]>(url).pipe(shareReplay(1));
            if (sub) sub.unsubscribe();
        });
    }

    fetchUtilities() {
        const sub = this.user.subscribe(user => {
            const clientId = user.selectedClient != null 
                ? user.selectedClient.clientId
                : user.sessionUser.sessionClient;
            const url = `${this.api}/clients/${clientId}/utilities`;
            this.utilities = this.http.get<Utility[]>(url).pipe(shareReplay(1));
            if (sub) sub.unsubscribe();
        });
    }
}
