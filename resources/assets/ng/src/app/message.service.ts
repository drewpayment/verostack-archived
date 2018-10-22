import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatSnackBarConfig} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';
import {SessionService} from '@app/session.service';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    messages: string[] = [];
    openBar: MatSnackBarRef<SimpleSnackBar> = null;

    constructor(private bar: MatSnackBar, private session: SessionService) {}

    /**
     * @param message string
     * @param action string @default 'dismiss'
     * @param duration number @default null Results in message that will not disappear until 
     * explicitly closed by the user. 
     */
    addMessage(message: string, action:string = 'dismiss', duration:number = null): void {
        let options = duration > 0 ? {duration: duration} : {};
        this.openBar = this.bar.open(message, action, options);
        this.session.hideLoader();
    }

    dismissSnackBar = () => this.openBar.dismiss();

    showWebApiError = (e: HttpErrorResponse): void => {
        let msg = e != null ? e.error.message : e.statusText != null ? e.statusText : e.message;
        this.openBar = this.bar.open(msg, 'dismiss');
        this.session.hideLoader();
    };

    showObserverError<T>(e: any, caught: T): T {
        let msg = e != null ? e.error.message : e.statusText != null ? e.statusText : e.message;
        this.openBar = this.bar.open(msg, 'dismiss');
        this.session.hideLoader();
        return caught;
    }
}
