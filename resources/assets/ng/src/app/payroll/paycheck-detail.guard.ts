import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { SessionService } from '@app/session.service';
import { ILocalStorage, User } from '@app/models';
import * as moment from 'moment';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class PaycheckDetailGuard implements CanActivate {

    constructor(private session:SessionService, private router:Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return Observable.create((observer:Observer<boolean>) => 
            this.session.isUserAuthenticated()
                .subscribe((store:ILocalStorage<User>) => {
                    const matchesEnvHeadless = next.queryParams.headless == environment.headless;

                    if (store != null && store.expires > moment().valueOf()) {
                        observer.next(true);
                        observer.complete();
                    } else if (matchesEnvHeadless) {
                        // we allow user to pass if the headless param matches environment, because we know 
                        // that it is coming from our embedded code 
                        observer.next(true);
                        observer.complete();
                    } else {
                        this.session.navigateQueue.push(state.url);
                        this.router.navigate(['login']);
                        observer.next(false);
                        observer.complete();
                    }
                }));
    }
}
