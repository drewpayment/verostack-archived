import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PayrollDetails } from '@app/models';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class PaycheckDetailService implements Resolve<PayrollDetails> {

    private _payrollDetails:PayrollDetails;
    get payrollDetails():PayrollDetails {
        return this._payrollDetails;
    }
    set payrollDetails(value:PayrollDetails) {
        if(value == null) return;
        this._payrollDetails = value;
    }

    constructor(private router:Router) {}

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<PayrollDetails> {
        return Observable.create((observer:Observer<PayrollDetails>) => {
            if(this.payrollDetails == null) {
                console.error('No payroll details, please reload the page and try again.');
                this.router.navigate(['/admin/pay/paycheck-list']);
                observer.next(null);
                observer.complete();
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

}
