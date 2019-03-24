import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerService } from './loading-spinner.service';
import { SessionService } from '@app/session.service';

@Component({
    selector: 'vero-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
    showSpinner: boolean;

    constructor(private session: SessionService) {}

    ngOnInit() {
        this.session.loading$.subscribe(n => (this.showSpinner = n));
    }
    
}
