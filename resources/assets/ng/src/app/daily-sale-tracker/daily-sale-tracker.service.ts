import { Injectable } from '@angular/core';
import { AuthService } from '@app/auth.service';
import { Observable, throwError } from 'rxjs';
import { SaleStatus, DailySale, HttpErrorResponse, DailySaleRequest, Graphql } from '@app/models';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Moment } from 'moment';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class DailySaleTrackerService {

    url: string;
    graphql = environment.graphql;

    constructor(private http: HttpClient, private auth: AuthService) {
        this.url = `${this.auth.apiUrl}api`;
    }

    getDailySalesByDate(clientId: number, campaignId: number, startDate: Moment, endDate: Moment): Observable<DailySale[]> {
        const url = `${this.url}/clients/${clientId}/daily-sales/campaigns/${campaignId}` +
            `/from/${startDate.format('YYYY-MM-DD')}/to/${endDate.format('YYYY-MM-DD')}`;
        return this.http.get<DailySale[]>(url);
    }

    getDailySalesByAgent(clientId: number, agentId: number, startDate: string, endDate: string): Observable<DailySale[]> {
        const url = `${this.url}/clients/${clientId}/daily-sales/agents/${agentId}/from/${startDate}/to/${endDate}`;
        return this.http.get<DailySale[]>(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    getPaycheckDetailSales(clientId: number, payCycleId: number): Observable<DailySale[]> {
        const url = `${this.url}/clients/${clientId}/pay-cycles/${payCycleId}/daily-sales`;
        return this.http.get<DailySale[]>(url);
    }

    createDailySale(clientId: number, dto: DailySale): Observable<DailySale> {
        const url = `${this.url}/clients/${clientId}/daily-sales`;
        return this.http.post<DailySale>(url, dto);
    }

    checkUniquePodAccount(account: number): Observable<boolean> {
        const url = `${this.url}/pods/${account}`;
        return this.http.get<boolean>(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateDailySale(clientId: number, dto: DailySale): Observable<DailySale> {
        const url = `${this.url}/clients/${clientId}/daily-sales/${dto.dailySaleId}`;
        return this.http.post<DailySale>(url, dto)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteDailySale(clientId: number, dailySaleId: number): Observable<boolean> {
        const url = `${this.url}/clients/${clientId}/daily-sales/${dailySaleId}`;
        return this.http.delete<boolean>(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    saveSaleWithContactInfo(clientId: number, campaignId: number, saleWithContact: DailySale): Observable<DailySale> {
        const url = `${this.url}/clients/${clientId}/campaigns/${campaignId}/daily-sales`;
        return this.http.post<DailySale>(url, saleWithContact);
    }

    saveSalesList(dtos: DailySaleRequest[]): Observable<DailySale[]> {
        const s = [`mutation { saveDailySales(input: [{`];
        dtos.forEach((d, i, a) => {
            for (const p in d) {
                if (p == 'agent_id' || p == 'client_id' || p == 'campaign_id' || p == 'utility_id'
                    || p == 'contact_id' || p == 'pod_account' || p == 'status' || p == 'paid_status'
                    || p == 'pay_cycle_id' || p == 'has_geo') {
                        s.push(`${p}: ${d[p]}`);
                    } else {
                        s.push(`${p}: "${d[p]}"`);
                    }

                if (i < dtos.length - 1) {
                    s.push(`}, {`);
                } else {
                    s.push(`}]) {`);
                    s.push(`dailySaleId agentId clientId utilityId contactId podAccount status `);
                    s.push(`paidStatus payCycleId hasGeo saleDate lastTouchDate paidDate`);
                    s.push(`chargeDate repaidDate createdAt updatedAt`);
                }
            }
        });
        return this.http.post<Graphql<DailySale[]>>(this.graphql, {
                query: s.join(' ')
            })
            .pipe(
                map(r => r.data.saveDailySales)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // client side network error
            console.log('Error occurred: ', error.error.message || error.message);
        } else {
            // backend returned server error
            console.error(`
        Server returned error code ${error.status}: ${error.error}
      `)
        }
        return throwError('There was a network error. Please try again.');
    }

}
