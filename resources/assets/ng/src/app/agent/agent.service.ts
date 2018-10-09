import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IAgent} from '@app/models';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '@app/auth.service';
import { catchError } from 'rxjs/operators';

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
    getAgentsByClient(clientId:number):Observable<IAgent[]> {
        let url = `${this.api}/clients/${clientId}/agents`;
        return this.http.get<IAgent[]>(url)
            .pipe(
                catchError(this.handleError)
            )
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
