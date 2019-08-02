import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';


@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {

    api = `${environment.apiUrl}api`;

    constructor(private http:HttpClient) {}

    resetPassword(request:ResetPasswordRequest):Observable<void> {
        const url = `${this.api}/save-password-reset`;
        return this.http.post<void>(url, request);
    }

}
