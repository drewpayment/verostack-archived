import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {FormControl, Validators, NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {SessionService} from '../session.service';

import * as moment from 'moment';

import {User, IToken, ILocalStorage} from '../models/index';
import {UserService} from '../user-features/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewChecked {
    pageLoading: boolean;
    lockLoginInputs: boolean = false;
    redirectQueue: string[] = [];

    user: User;

    username = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);

    constructor(
        public authService: AuthService,
        private session: SessionService,
        private userService: UserService    ) {}

    ngOnInit() {
        this.userService.user.subscribe((next: User) => {
            this.user = next;
            this.session.hideLoader();
        });
    }

    ngAfterViewChecked() {}

    ngOnDestroy() {
        this.lockLoginInputs = false;
    }

    onSubmit(f: NgForm) {
        this.session.showLoader();
        // this.usernameInput = f.value.username;

        let loginData:any = {
            //   grant_type: 'password',
            // client_id: 3,
            //   client_secret: 'qHZzQxduSU92Vgb0hBwLcx4W4jjKWf5lykM0bxnm',
            username: f.value.username,
            password: f.value.password,
            // scope: ''
        };

        if (f.form.valid) {
            this.lockLoginInputs = true;
            this.pageLoading = true;

            this.authService.ngLogin(loginData).subscribe(response => {
                this.pageLoading = false;
                this.lockLoginInputs = false;

                const sessionToken:ILocalStorage<IToken> = {
                    data: { access_token: response.token } as IToken,
                    expires: moment().valueOf() + 1000 * (60 * 24 * 3)
                };

                this.session.login(sessionToken);
                this.userService.storeNgUser(response.user);
            });

            // this.authService
            //     .login(loginData)
            //     .then(data => {
            //         this.pageLoading = false;
            //         this.lockLoginInputs = false;

            //         let token: ILocalStorage<IToken> = <ILocalStorage<IToken>>{
            //             data: data,
            //             expires: moment().valueOf() + 1000 * (60 * 24 * 3)
            //         };

            //         this.session.login(token);
            //         this.userService.loadUser(this.usernameInput);
            //         // TODO: this isn't working yet... need to re-work login routing
            //         // this.session.navigateTo(this.session.navigateQueue[0]);
            //     })
            //     .catch(err => {
            //         this.pageLoading = false;
            //         this.lockLoginInputs = false;

            //         this.session.clearStorage();
            //         let friendlyResponse = ' Please check your credentials and try again.';
            //         this.msg.addMessage(err.message + friendlyResponse, 'close');
            //         this.session.hideLoader();
            //     });
        }
    }

    loginHandler() {
        this.pageLoading = false;
    }

    getErrorMessage() {
        return this.username.hasError('required')
            ? 'You must enter a value'
            : this.password.hasError('required')
                ? 'You must enter a value'
                : '';
    }
}
