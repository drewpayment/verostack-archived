import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { PayrollDetails, Paginator } from '@app/models';
import { Moment } from '@app/shared';

@Injectable({
    providedIn: 'root'
})
export class PaycheckService {

    api:string = environment.apiUrl + 'api';

    constructor(private http:HttpClient) {}

    getPaychecks(
        clientId:number, 
        page:number = 1, 
        resultsPerPage?:number, 
        startDate?:Moment|string, 
        endDate?:Moment|string
    ):Observable<Paginator<PayrollDetails>> {
        const url = `${this.api}/clients/${clientId}/payroll-details`;
        let params = new HttpParams().set('page', page.toString());
        if(resultsPerPage) params = params.append('resultsPerPage', resultsPerPage.toString());
        if(startDate || endDate) {
            if(startDate == null || endDate == null) 
                throw new Error('Both start date and end date are required if you select one.');
            params = params.append('startDate', startDate.toString());
            params = params.append('endDate', endDate.toString());
        } 
        return this.http.get<Paginator<PayrollDetails>>(url, { params: params });
    }

    getPaychecksByDetail(clientId:number, payrollDetailsId:number, page:number = 1):Observable<Paginator<PayrollDetails>> {
        const url = `${this.api}/clients/${clientId}/payroll-details/${payrollDetailsId}`;
        const params = new HttpParams().set('page', page.toString());
        return this.http.get<any>(url, { params: params });
    }
}
