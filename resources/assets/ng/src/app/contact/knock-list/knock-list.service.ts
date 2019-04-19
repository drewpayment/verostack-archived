import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { DncContact } from '@app/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class KnockListService implements Resolve<DncContact[]> {

    api = environment.apiUrl + 'api';

    constructor(private http:HttpClient) { }

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<DncContact[]> {
        return this.http.get<DncContact[]>(`${this.api}/get-dnc-contacts`);
    }
}
