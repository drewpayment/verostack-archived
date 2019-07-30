import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';

@Component({
    selector: 'vs-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    email = new FormControl('', [Validators.required, Validators.email]);

    constructor(private service:ForgotPasswordService) { }

    ngOnInit() {
    }

    nextStep() {
        this.service.sendPasswordResetLink(this.email.value)
            .subscribe((result) => {
                console.dir(result);
            });
    }

}
