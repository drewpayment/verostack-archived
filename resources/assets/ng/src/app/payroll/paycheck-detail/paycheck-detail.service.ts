import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PayrollDetails, User } from '@app/models';
import { Observable, Observer } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaycheckDetailService implements Resolve<PayrollDetails> {

    private api = environment.apiUrl + 'api';

    private _payrollDetails:PayrollDetails;
    get payrollDetails():PayrollDetails {
        return this._payrollDetails;
    }
    set payrollDetails(value:PayrollDetails) {
        if (value == null) return;
        this._payrollDetails = value;
    }

    private _headlessUserCache:User;
    get headlessUser():User {
        return this._headlessUserCache;
    }

    constructor(private router:Router, private http:HttpClient) {}

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<PayrollDetails> {
        return Observable.create((observer:Observer<PayrollDetails>) => {
            if (this.payrollDetails == null) {
                const params = route.queryParams;
                const detailId = +params['detail'] || 0;
                const userId = +params['user'] || 0;
                const clientId = +params['client'] || 0;
                const headless = params['headless'];

                this.getPaycheck(clientId, userId, detailId, headless)
                    .subscribe(headlessDetail => {
                        this._headlessUserCache = headlessDetail.user;
                        this.payrollDetails = headlessDetail.detail;

                        observer.next(this.payrollDetails);
                        observer.complete();
                    }, err => {

                        console.error('No payroll details, please reload the page and try again.');
                        this.router.navigate(['/admin/pay/paycheck-list']);
                        observer.next(null);
                        observer.complete(); 

                    });
            } else {

                observer.next(this.payrollDetails);
                observer.complete();

            }
        });
    }

    navigateToDetail(detail:PayrollDetails):void {
        this.payrollDetails = detail;
        this.router.navigate(['/admin/pay/paycheck-detail']);
    }

    getPaycheck(clientId:number, userId:number, payrollDetailId:number, headless:string):Observable<{ detail:PayrollDetails, user:User }> {
        const url = `${this.api}/clients/${clientId}/users/${userId}/payroll-details/${payrollDetailId}/${headless}`;
        return this.http.get<{ detail:PayrollDetails, user:User }>(url);
    }

}
