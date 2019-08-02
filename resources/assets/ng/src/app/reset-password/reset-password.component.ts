import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ResetPasswordService } from './reset-password.service';

@Component({
    selector: 'vs-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    resetId:string;
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);
    passwordConfirmation = new FormControl('', [Validators.required]);

    constructor(private route: ActivatedRoute, private service: ResetPasswordService, private router: Router) { }

    ngOnInit() {
        // reset id is saved as snapshot to what was requested from email to avoid tampering
        this.resetId = this.route.snapshot.params['resetId'];
    }

    submitResetForm() {
        const request:ResetPasswordRequest = {
            email: this.email.value,
            password: this.password.value,
            password_confirmation: this.passwordConfirmation.value,
            token: this.resetId
        };

        this.service.resetPassword(request).subscribe(() => {
           
            setTimeout(() => {
                this.router.navigate(['login']);
            }, 1500);

        }, (err) => this.router.navigate(['login']));
    }

    getPasswordConfirmationErrorMessages() {
        if (this.passwordConfirmation.getError('required')) {
            return 'Please confirm your password.';
        }

        if (this.passwordConfirmation.getError('pattern')) {
            return 'Oops, looks like your passwords don\'t match.';
        }
    }

    validatePasswordsMatch(c: FormControl) {
        const matches = c.parent != null && c.parent.get('password').value.trim() == c.value.trim();
        return matches ? null : {
            passwordsMatch: true
        };
    }

}
