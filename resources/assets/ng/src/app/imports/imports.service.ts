import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImportModel, Utility, ICampaign, HttpErrorResponse } from '@app/models';
import { environment } from '@env/environment';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { SessionService } from '@app/session.service';
import { shareReplay, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ImportsService {

    api = environment.apiUrl + 'api';

    campaigns: Observable<ICampaign[]>;
    utilities: Observable<Utility[]>;

    constructor(private http: HttpClient, private session: SessionService, private router: Router) { }

    getImportModels():Observable<ImportModel[]> {
        const url = `${this.api}/import-models`;
        return this.http.get<ImportModel[]>(url)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    if (err.status == 401) {
                        this.session.logout();
                    }
                    return of(null);
                }),
            );
    }

    saveImportModel(model: ImportModel):Observable<ImportModel> {
        const url = `${this.api}/save-import-model`;
        return this.http.post<ImportModel>(url, model);
    }

    fetchCampaigns() {
        this.session.getUserItem().subscribe(user => {
            const clientId = user.selectedClient.clientId;
            const url = `${this.api}/campaigns/clients/${clientId}/active/true`;
            this.campaigns = this.http.get<ICampaign[]>(url).pipe(shareReplay(1));
        });
    }

    fetchUtilities() {
        this.session.getUserItem().subscribe(user => {
            const clientId = user.selectedClient.clientId;
            const url = `${this.api}/clients/${clientId}/utilities`;
            this.utilities = this.http.get<Utility[]>(url).pipe(shareReplay(1));
        });
    }
}
