import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { SessionService } from '../session.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

import { IUser, User, IToken, ILocalStorage } from '../models/index';
import { UserService } from '../user-features/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewChecked {
  pageLoading: boolean;
  lockLoginInputs: boolean = false;
  redirectQueue: string[] = [];

  user: IUser;
  private usernameInput: string;

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    public authService: AuthService,
    private session: SessionService,
    private userService: UserService,
    private router: Router,
    private msg: MessageService
  ) {}

  ngOnInit() {
    this.userService.user.subscribe((next: IUser) => {
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
    this.usernameInput = f.value.username;

    let loginData = {
      grant_type: 'password',
      client_id: 3,
      client_secret: 'qHZzQxduSU92Vgb0hBwLcx4W4jjKWf5lykM0bxnm',
      username: f.value.username,
      password: f.value.password,
      scope: ''
    };

    if(f.form.valid) {
      this.lockLoginInputs = true;
      this.pageLoading = true;
      this.authService.login(loginData)
        .then(data => {
          this.pageLoading = false;
          this.lockLoginInputs = false;

          let token:ILocalStorage<IToken> = <ILocalStorage<IToken>>{
            data: data,
            expires: data.expires_in
          };

          this.session.login(token);
          this.userService.loadUser(this.usernameInput);
          this.session.navigateTo(this.session.navigateQueue[0]);
        })
        .catch(err => {
          this.pageLoading = false;
          this.lockLoginInputs = false;

          this.session.clearStorage();
          let friendlyResponse = ' Please check your credentials and try again.';
          this.msg.addMessage(err.message + friendlyResponse, 'close');
          this.session.hideLoader();
        });
    }
  }

  loginHandler(res: any) {
    this.pageLoading = false;
  }

  getErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' :
      this.password.hasError('required') ? 'You must enter a value' : '';
  }

}
