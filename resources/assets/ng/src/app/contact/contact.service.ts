import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Contact } from '@app/models/contact.model';
import { Observable } from 'rxjs';
import { SessionService } from '@app/session.service';
import { AuthService } from '@app/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { LaravelErrorResponse } from '@app/models/validator-error.model';
import { MessageService } from '@app/message.service';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private api:string;
    _contacts:Contact[];
    constructor(
        private http: HttpClient,
        private auth:AuthService,
        private msg:MessageService
    ) {
        this.api = `${this.auth.apiUrl}api`;
    }

    /**
     * Get collection of contact entities by the current client.
     * 
     * @param clientId 
     */
    getContactsByClient(clientId:number):Observable<Contact[]> {
        return this.http.get<Contact[]>(`${this.api}/clients/${clientId}/contacts`)
            .pipe(
                tap(next => this._contacts = next),
                catchError(this.handleError)
            );
    }

    /**
     * Save a contact entity.
     * 
     * @param clientId
     * @param contact 
     */
    saveContact(clientId:number, contact:Contact):Observable<Contact> {
        const url = contact.contactId != null && contact.contactId > 0
            ? `${this.api}/clients/${clientId}/contacts/${contact.contactId}`
            : `${this.api}/clients/${clientId}/contacts`;
        return this.http.post<Contact>(url, contact)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError<T>(resp:LaravelErrorResponse, caught:Observable<T>):Observable<T> {
        const keys = Object.keys(resp.error.errors);
        let errorMsg:string = 'Errors: ';

        keys.forEach(key => {
            const propErrors:string[] = resp.error.errors[key];
            if (!_.isArray(propErrors)) return; /** if this isn't an array, it means we don't have any errors and need to bail */
            propErrors.forEach((pe:string, i:number) => {
                errorMsg += `(${i+1}) ${pe}`;
            });
        });
        this.msg.addMessage(errorMsg);
        return caught;
    }
}
