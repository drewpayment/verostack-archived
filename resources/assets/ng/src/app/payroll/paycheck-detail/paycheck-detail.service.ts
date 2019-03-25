import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PayrollDetails, User } from '@app/models';
import { Observable, Observer } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { HeadlessPayload } from '@app/models/headless-payload.model';
import { map, tap } from 'rxjs/operators';
import { SessionService } from '@app/session.service';
import { Role } from '@app/models/role.model';

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

    private _headlessPayload:HeadlessPayload;
    get headlessPayload():HeadlessPayload {
        return this._headlessPayload;
    }

    constructor(private router:Router, private http:HttpClient, private session:SessionService) {}

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<PayrollDetails> {
        return Observable.create((observer:Observer<PayrollDetails>) => {
            if (this.payrollDetails == null) {
                const params = route.queryParams;
                const detailId = +params['detail'] || 0;
                const userId = +params['user'] || 0;
                const clientId = +params['client'] || 0;
                const headless = params['headless'];

                if (userId == 0 || clientId == 0 || detailId == 0 || headless == null) {
                    this._noDetailsRedirect(observer);
                } else {

                    this.getPaycheck(clientId, userId, detailId, headless)
                        .subscribe(payload => {
                            this._headlessPayload = payload;
                            this.payrollDetails = payload.detail;

                            observer.next(this.payrollDetails);
                            observer.complete();
                        }, err => this._noDetailsRedirect(observer));
                }
            } else {
                observer.next(this.payrollDetails);
                observer.complete();
            }
        });
    }

    private _noDetailsRedirect(observer:Observer<PayrollDetails>):void {
        console.error('No payroll details, please reload the page and try again.');

        this.session.getUserItem().subscribe(user => {
            if (user.role.role < Role.companyAdmin) {
                this.router.navigate(['users', 'payroll', 'list']);
            } else {
                this.router.navigate(['admin', 'pay', 'paycheck-list']);
            }

            observer.next(null);
            observer.complete(); 
        });
    }

    navigateToDetail(detail:PayrollDetails):void {
        this.payrollDetails = detail;
        this.router.navigate(['/admin/pay/paycheck-detail']);
    }

    getPaycheck(clientId:number, userId:number, payrollDetailId:number, headless:string):Observable<HeadlessPayload> {
        const url = `${this.api}/clients/${clientId}/users/${userId}/payroll-details/${payrollDetailId}/${headless}`;
        return this.http.get<HeadlessPayload>(url);
    }

    /**
     * This method calls a secure endpoint that ensures the user has rights to the access the API, 
     * then executes a script with puppeteer to generate the PDF version of the paystub. Once generated, this call 
     * will download that PDF and return it, so we can open in the browser and display it to the user. 
     * 
     * @param clientId 
     * @param payrollDetailsId 
     */
    generatePdf(clientId:number, payrollDetailsId:number):Observable<{ data:string }> {
        const url = `${this.api}/clients/${clientId}/payroll-details/${payrollDetailsId}/generate-pdf`;
        return this.http.get<{ data:string }>(url)
            .pipe(
                tap(res => console.dir(res))
            );
    }

}
