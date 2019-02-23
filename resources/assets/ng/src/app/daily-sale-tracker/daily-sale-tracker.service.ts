import { Injectable } from '@angular/core';
import { AuthService } from '@app/auth.service';
import { Observable, throwError } from 'rxjs';
import { SaleStatus, DailySale, HttpErrorResponse } from '@app/models';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DailySaleTrackerService {

  url:string;

  constructor(private http:HttpClient, private auth:AuthService) {
    this.url = `${this.auth.apiUrl}api`;
  }

  getDailySalesByDate(clientId:number, campaignId:number, startDate:string, endDate:string):Observable<DailySale[]> {
    const url = `${this.url}/clients/${clientId}/daily-sales/campaigns/${campaignId}/from/${startDate}/to/${endDate}`;
    return this.http.get<DailySale[]>(url);
  }

  getDailySalesByAgent(clientId:number, agentId:number, startDate:string, endDate:string):Observable<DailySale[]> {
    const url = `${this.url}/clients/${clientId}/daily-sales/agents/${agentId}/from/${startDate}/to/${endDate}`;
    return this.http.get<DailySale[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPaycheckDetailSales(clientId:number, payCycleId:number):Observable<DailySale[]> {
    const url = `${this.url}/clients/${clientId}/pay-cycles/${payCycleId}/daily-sales`;
    return this.http.get<DailySale[]>(url);
  }

  createDailySale(clientId:number, dto:DailySale):Observable<DailySale> {
    const url = `${this.url}/clients/${clientId}/daily-sales`;
    return this.http.post<DailySale>(url, dto);
  }

  checkUniquePodAccount(account:number):Observable<boolean> {
      const url = `${this.url}/pods/${account}`;
      return this.http.get<boolean>(url)
        .pipe(
            catchError(this.handleError)
        );
  }

  updateDailySale(clientId:number, dto:DailySale):Observable<DailySale> {
    const url = `${this.url}/clients/${clientId}/daily-sales/${dto.dailySaleId}`;
    return this.http.post<DailySale>(url, dto)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteDailySale(clientId:number, dailySaleId:number):Observable<boolean> {
    const url = `${this.url}/clients/${clientId}/daily-sales/${dailySaleId}`;
    return this.http.delete<boolean>(url)
      .pipe(
        catchError(this.handleError)
      )
  }

  saveSaleWithContactInfo(clientId:number, campaignId:number, saleWithContact:DailySale):Observable<DailySale> {
      const url = `${this.url}/clients/${clientId}/campaigns/${campaignId}/daily-sales`;
      return this.http.post<DailySale>(url, saleWithContact);
  }

  private handleError(error:HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
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
