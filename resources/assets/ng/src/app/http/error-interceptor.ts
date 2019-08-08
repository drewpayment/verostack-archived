import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SessionService } from '@app/session.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private session: SessionService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                    }

                    window.alert(errorMessage);

                    // This means the user is no longer authenticated with the API and we should 
                    // log them out, revoke any tokens and send them to the login page. 
                    if (error.status == 401) {
                        this.session.logout();
                    }

                    return throwError(error);
                })
            );
    }

}