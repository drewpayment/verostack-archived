import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { DncContact, Graphql } from '@app/models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, Observer } from 'rxjs';
import { ContactService } from '../contact.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class KnockListService implements Resolve<DncContact[]> {

    api = environment.apiUrl + 'api';

    constructor(private http:HttpClient, private contactService:ContactService) { }

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<DncContact[]> {
        return Observable.create((observer:Observer<DncContact[]>) => {
            this.getDncContacts().subscribe(contacts => {
                this.contactService.setRestrictedContacts(contacts.sort(this._sortContacts));
                observer.next(this.contactService._restrictedContacts$.getValue());
                observer.complete();
            }, err => {
                observer.next(null);
                observer.complete();
            });
        });
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

    private _sortContacts(a:DncContact, b:DncContact):number {
        const aField = a.lastName ? a.lastName : a.firstName ? a.firstName : a.description;
        const bField = b.lastName ? b.lastName : b.firstName ? b.firstName : b.description;
        if (aField < bField) return -1;
        if (aField > bField) return 1;
        return 0;
    }

    
}
