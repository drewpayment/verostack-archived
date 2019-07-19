import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, Observer } from 'rxjs';
import { PayrollDetails, Paginator } from '@app/models';
import { Moment } from '@app/shared';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class PaycheckService {

    api: string = environment.apiUrl + 'api';

    private _startDate: Moment;
    get startDate() { return this._startDate; }
    set startDate(value:Moment) {
        if (value == null) return;
        this._startDate = moment(value);
    }
    private _endDate: Moment;
    get endDate() { return this._endDate; }
    set endDate(value: Moment) {
        if (value == null) return;
        this._endDate = moment(value);
    }

    constructor(private http: HttpClient) {}

    getPaychecks(
        clientId:number, 
        page:number = 1, 
        resultsPerPage?:number, 
        startDate?:Moment|string|Date, 
        endDate?:Moment|string|Date
    ):Observable<Paginator<PayrollDetails>> {
        const url = `${this.api}/clients/${clientId}/payroll-details`;
        let params = new HttpParams().set('page', page.toString());
        if (resultsPerPage) params = params.append('resultsPerPage', resultsPerPage.toString());
        if (startDate && endDate) {
            if (startDate == null || endDate == null) 
                throw new Error('Both start date and end date are required if you select one.');
            params = params.append('startDate', moment(startDate).format('YYYY-MM-DD'));
            params = params.append('endDate', moment(endDate).format('YYYY-MM-DD'));
        } 
        return this.http.get<Paginator<PayrollDetails>>(url, { params: params });
    }

    getPaychecksByDetail(clientId:number, payrollDetailsId:number, page:number = 1):Observable<Paginator<PayrollDetails>> {
        const url = `${this.api}/clients/${clientId}/payroll-details/${payrollDetailsId}`;
        const params = new HttpParams().set('page', page.toString());
        return this.http.get<any>(url, { params: params });
    }

    /**
     * USER PAYCHECK API ENDPOINTS
     * 
     * 
     */

    getAgentPaycheckList(
        clientId:number, 
        agentId:number, 
        page:number = 1, 
        resultsPerPage?:number,
        startDateArgs?:any, 
        endDateArgs?:any
    ):Observable<Paginator<PayrollDetails>> {
        const url = `${this.api}/clients/${clientId}/agents/${agentId}/earnings`;
        let params = new HttpParams().set('page', page.toString());
        if (resultsPerPage) params = params.append('resultsPerPage', resultsPerPage.toString());
        if (startDateArgs && endDateArgs) {
            const startDate = moment(startDateArgs);
            const endDate = moment(endDateArgs);
            if (!startDate.isValid() || !endDate.isValid()) {
                // throw new Error('Both start and end date are required!');
                return Observable.create((observer:Observer<Paginator<PayrollDetails>>) => {
                    observer.error(`Both start and end date are required.`);
                    observer.complete();
                });
            }
            params = params.append('startDate', startDate.format('YYYY-MM-DD'));
            params = params.append('endDate', endDate.format('YYYY-MM-DD'));
        }
        return this.http.post<Paginator<PayrollDetails>>(url, { params: params });
    }
}
