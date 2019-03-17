import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Payroll, PayrollDetails } from '@app/models';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class PayrollService {

    api:string = environment.apiUrl + 'api';

    constructor(private http:HttpClient) {}

    savePayrollList(clientId:number, payload:Payroll[]):Observable<Payroll[]> {
        const url = `${this.api}/clients/${clientId}/payrolls`;
        return this.http.post<Payroll[]>(url, payload);
    }

    getPayrollList(clientId:number, userId:number):Observable<Payroll[]> {
        const url = `${this.api}/clients/${clientId}/users/${userId}/payrolls`;
        return this.http.get<Payroll[]>(url);
    }

    saveAutoReleaseSettings(clientId:number, ids:number[], date:any) {
        const url = `${this.api}/clients/${clientId}/payrolls/auto-release`;
        const body = {
            date: date,
            payrollIds: ids
        };
        return this.http.post<Payroll[]>(url, body);
    }

    removeAutoReleaseSettings(clientId:number, payrollId:number):Observable<Payroll> {
        const url = `${this.api}/clients/${clientId}/payrolls/${payrollId}/remove-auto-release`;
        return this.http.get<Payroll>(url);
    }

    setReleased(clientId:number, payrollIds:number[]):Observable<boolean> {
        const url = `${this.api}/clients/${clientId}/payrolls/set-released`;
        const params = new HttpParams().set('payrollIds', JSON.stringify(payrollIds));
        return this.http.get<boolean>(url, { params: params });
    }

    savePayrollDetails(clientId:number, details:PayrollDetails):Observable<Payroll[]> {
        const url = `${this.api}/clients/${clientId}/payrolls/${details.payrollId}/details/${details.payrollDetailsId}`;
        return this.http.post<Payroll[]>(url, details);
    }
    
}
