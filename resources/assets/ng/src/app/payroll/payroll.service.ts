import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payroll } from '@app/models';
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
    
}
