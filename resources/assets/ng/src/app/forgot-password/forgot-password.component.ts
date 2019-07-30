import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'vs-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    email = new FormControl('', [Validators.required, Validators.email]);

    constructor() { }

    ngOnInit() {
    }

    nextStep() {
        console.log('Next step...');
    }

}
