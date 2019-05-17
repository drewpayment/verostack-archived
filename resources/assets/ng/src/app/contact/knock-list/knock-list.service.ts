import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { DncContact } from '@app/models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ContactService } from '../contact.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class KnockListService implements Resolve<DncContact[]> {

    api = environment.apiUrl + 'api';

    constructor(private http:HttpClient, private contactService:ContactService) { }

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<DncContact[]> {
        return this.getDncContacts();
    }

    getDncContacts():Observable<DncContact[]> {
        return this.http.get<DncContact[]>(`${this.api}/dnc-contacts`)
            .pipe(
                tap(contacts => this.contactService._restrictedContacts$.next(contacts))
            );
    }

    saveNewDncContact(contact:DncContact):Observable<DncContact> {
        return this.http.post<DncContact>(`${this.api}/dnc-contacts`, contact);
    }

    deleteDncContacts(dncContactIds:number[]) {
        const params = new HttpParams().set('dncContactIds', dncContactIds.join(','));
        // dncContactIds.forEach(d => params = params.append('dncContactIds', d.toString()));
        return this.http.delete(`${this.api}/dnc-contacts`, { params: params });
    }
}
