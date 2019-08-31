import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Contact, ContactRequest } from '@app/models/contact.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { SessionService } from '@app/session.service';
import { AuthService } from '@app/auth.service';
import { catchError, tap, map } from 'rxjs/operators';
import { LaravelErrorResponse } from '@app/models/validator-error.model';
import { MessageService } from '@app/message.service';
import * as _ from 'lodash';
import { DncContact, GeocodingRequest, GeocodingResponse, Graphql, DncContactRequest } from '@app/models';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private api:string;
    _contacts:Contact[];

    private restrictedContacts:DncContact[];
    _restrictedContacts$ = new BehaviorSubject<DncContact[]>(null);

    private gUrl = environment.geocoding;
    private gKey = environment.geocodingApi;
    graphql = environment.graphql;

    constructor(
        private http: HttpClient,
        private auth:AuthService,
        private msg:MessageService
    ) {
        this.api = `${this.auth.apiUrl}api`;
    }

    getGeocoding(address: GeocodingRequest): Observable<GeocodingResponse> {
        let query = '';
        for (const p in address) {
            if (address[p]) {
                if (query.length) query += '+';
                query += `${address[p]}`;
            }
        }
        query += `&key=${this.gKey}`;
        return this.http.get<GeocodingResponse>(this.gUrl + query);
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

    setRestrictedContacts(contacts:DncContact[]) {
        this.restrictedContacts = contacts;
        this._restrictedContacts$.next(contacts);
    }

    getAllRestrictedContacts():DncContact[] {
        return this.restrictedContacts;
    }

    saveContactList(dtos: ContactRequest[]): Observable<Contact[]> {
        const s = ['mutation { newContactList(input: [{'];
        dtos.forEach((d, i, a) => {
            for (const p in d) {
                if (p == 'client_id' || p == 'contact_type' || p == 'ssn' || p == 'phone' || p == 'fax'
                    || p == 'phone_country' || p == 'fax_country') {
                        s.push(`${p}: ${d[p]}`);
                    } else {
                        s.push(`${p}: "${d[p]}"`);
                    }

                if (i < dtos.length - 1) {
                    s.push(`}, {`);
                } else {
                    s.push(`}]) {`);
                    s.push(`contactId clientId contactType businessName firstName lastName middleName prefix `);
                    s.push(`suffix ssn dob street street2 city state zip phoneCountry phone faxCountry fax email `);
                }
            }
        });
        return this.http.post<Graphql<Contact[]>>(this.graphql, {
                query: s.join(' ')
            })
            .pipe(
                map(r => r.data.newContactList)
            );
    }

    saveDncContactList(dtos: DncContactRequest[]): Observable<DncContact[]> {
        const sb = [`mutation { newDncContactList(input: [{`];
        dtos.forEach((d, i, a) => {
            for (const p in d) {
                if (p == 'client_id' || p == 'lat' || p == 'long') {
                    sb.push(`${p}: ${d[p]}`);
                } else if (p == 'geocode') {
                    sb.push(`${p}: ${JSON.stringify(d[p])}`);
                } else {
                    sb.push(`${p}: "${d[p]}"`);
                }
            }

            if (i < (dtos.length - 1)) {
                sb.push(`}, {`);
            } else {
                sb.push(`}]) {`);
                sb.push(`dncContactId clientId firstName lastName description address `);
                sb.push(`addressCont city state zip note lat long geocode }}`);
            }
        });
        return this.http.post<Graphql<DncContact[]>>(this.graphql, {
                query: sb.join(' ')
            })
            .pipe(
                map(result => result.data.newDncContactList)
            );
    }

    private handleError<T>(resp:LaravelErrorResponse, caught:Observable<T>):Observable<T> {
        const keys = Object.keys(resp.error.errors);
        let errorMsg = 'Errors: ';

        keys.forEach(key => {
            const propErrors:string[] = resp.error.errors[key];
            if (!_.isArray(propErrors)) return; /** if this isn't an array, it means we don't have any errors and need to bail */
            propErrors.forEach((pe:string, i:number) => {
                errorMsg += `(${i + 1}) ${pe}`;
            });
        });
        this.msg.addMessage(errorMsg);
        return caught;
    }
}
