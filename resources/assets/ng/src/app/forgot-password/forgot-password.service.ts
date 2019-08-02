import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';


@Injectable({
    providedIn: 'root'
})
export class ForgotPasswordService {

    api = `${environment.apiUrl}api`;

    constructor(private http:HttpClient) {}

    sendPasswordResetLink(email: string):Observable<any> {
        const url = `${this.api}/reset-password`;
        const params = new HttpParams().set('email', email);
        return this.http.get(url, {params: params});
    }

}