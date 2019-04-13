import {Component, Inject, OnInit, ViewChildren, QueryList } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatInput} from '@angular/material';
import {User, IUserDetail, IAgent} from '@app/models';
import {FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {IState, States} from '@app/shared/models/state.model';
import {MessageService} from '@app/message.service';
import {AgentsService} from '@app/core/agents/agents.service';

import * as _ from 'lodash';
import {UserService} from '@app/user-features/user.service';
import {SessionService} from '@app/session.service';
import { catchError } from 'rxjs/operators';
import { RoleType } from '@app/models/role.model';
import { AgentService } from '@app/agent/agent.service';
import { Observable, of } from 'rxjs';
import { LaravelErrorResponse } from '@app/models/validator-error.model';

interface IKeyValue {
    key: string | number;
    value: any;
}

interface DataDialog {
    user: User;
}

@Component({
    selector: 'add-agent-dialog',
    templateUrl: './add-agent.component.html',
    styleUrls: ['./add-agent.component.scss']
})
export class AddAgentDialogComponent implements OnInit {
    user: User;
    states: IState[];
    userEntity: User;
    detailEntity: IUserDetail;
    agentEntity: IAgent;
    userForm: FormGroup;
    detailForm: FormGroup;
    agentForm: FormGroup;
    roleType:FormControl;

    verifyAccount: number = null;
    managers: IAgent[];
    roleTypes:RoleType[];
    usernameTaken:boolean = false;
    attemptedUsername:string;
    suggestedUsername:string;

    @ViewChildren(MatInput) inputs:QueryList<MatInput>;

    constructor(
        public ref: MatDialogRef<AddAgentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DataDialog,
        private fb: FormBuilder,
        private msg: MessageService,
        private service:AgentService,
        private agentsService: AgentsService,
        private userService: UserService,
        private session: SessionService
    ) {
        this.user = this.data.user;
        this.states = States.$get();
    }

    ngOnInit() {
        this.agentsService.getRoleTypes(true)
            .subscribe(roleTypes => this.roleTypes = roleTypes);

        this.createUserForm();
        this.createDetailForm();
        this.createAgentForm();
        this.createRoleTypeForm();

        // DO SOME MORE STUFF
        this.agentsService
            .getAgents()
            .then(agents => {
                this.managers = _.filter(agents, (a: IAgent) => {
                    return a.isManager;
                });
            })
            .catch(this.msg.showWebApiError);
    }

    saveNewUserAgentEntity(): void {
        if (this.userForm.invalid || this.detailForm.invalid || this.agentForm.invalid) return;

        this.session.showLoader();

        this.userEntity = {
            firstName: this.userForm.value.firstName,
            lastName: this.userForm.value.lastName,
            username: this.userForm.value.username,
            email: this.userForm.value.email,
            password: this.userForm.value.password,
            active: true
        };

        this.detailEntity = {
            street: this.detailForm.value.street,
            street2: this.detailForm.value.street2,
            city: this.detailForm.value.city,
            state: this.detailForm.value.state,
            zip: this.detailForm.value.zip,
            ssn: this.detailForm.value.ssn,
            phone: this.detailForm.value.phone,
            birthDate: this.detailForm.value.birthDate,
            bankRouting: this.detailForm.value.bankRouting,
            bankAccount: this.detailForm.value.bankAccount
        };

        this.agentEntity = {
            firstName: this.userForm.value.firstName,
            lastName: this.userForm.value.lastName,
            managerId: this.agentForm.value.managerId,
            isManager: this.agentForm.value.isManager
        };

        let role = this.roleType.value;

        this.userService
            .saveNewUserAgentEntity(this.userEntity, this.agentEntity, this.detailEntity, this.user.sessionUser.sessionClient, role)
            .pipe(
                catchError((resp:LaravelErrorResponse, caught:Observable<boolean>) => {
                    let keys = Object.keys(resp.error.errors);
                    let errorDisplaymsg:string = 'Errors: ';

                    keys.forEach(key => {
                        let propErrors:string[] = resp.error.errors[key];
                        if(!_.isArray(propErrors)) return;
                        propErrors.forEach((pe:string, i:number) => {
                            errorDisplaymsg += `(${i + 1}) ${pe}`;
                        });

                        if(key == 'email') 
                            this.userForm.controls.email.setErrors({ notUnique: true });
                    });

                    this.msg.addMessage(errorDisplaymsg, 'dismiss');

                    return of(false);
                })
            )
            .subscribe(result => {
                if (!result) return;
                this.msg.addMessage('User added!', 'dismiss', 6000);
                this.ref.close(result);
            });
    }

    close(): void {
        this.ref.close(this.data);
    }

    copyPasswordText(copy: string): void {
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = copy;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);

        this.msg.addMessage('Password copied to your clipboard!', 'dismiss', 6000);
    }

    private createUserForm(): void {
        let pw = this.makeUpperCaseRandomLetter(
            Math.random()
                .toString(36)
                .slice(-8)
        );

        this.userForm = this.fb.group({
            firstName: this.fb.control('', [Validators.required]),
            lastName: this.fb.control('', [Validators.required]),
            username: this.fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
            email: this.fb.control('', [Validators.required, Validators.email]),
            password: this.fb.control(pw, [Validators.required])
        });
    }

    private makeUpperCaseRandomLetter(pw: string): string {
        let kv = this.getRandomCharKeyValue(pw);
        if (!/^[a-zA-Z]+$/.test(kv.value)) this.makeUpperCaseRandomLetter(pw);
        kv.value = kv.value.toUpperCase();
        return this.replaceAt(pw, +kv.key, kv.value);
    }

    private getRandomCharKeyValue(pw: string): IKeyValue {
        let min = 0;
        let max = pw.length - 1;
        let key = Math.floor(Math.random() * (max - min + 1)) + min;
        return {key: key, value: pw.charAt(key)};
    }

    private replaceAt(original: string, index: number, replacement: string): string {
        return original.substr(0, index) + replacement + original.substr(index + replacement.length);
    }

    private createDetailForm(): void {
        this.detailForm = this.fb.group({
            street: this.fb.control('', [Validators.required]),
            street2: this.fb.control('', []),
            city: this.fb.control('', [Validators.required]),
            state: this.fb.control('', [Validators.required]),
            zip: this.fb.control('', [Validators.required, Validators.pattern(/^\d{5}?$/)]),
            ssn: this.fb.control('', [Validators.pattern(/^\d{3}-?\d{2}-?\d{4}$/)]),
            phone: this.fb.control('', [Validators.required, Validators.pattern(/^\d{10}?$/)]),
            birthDate: this.fb.control('', [Validators.required]),
            bankRouting: this.fb.control('', []),
            verifyRouting: this.fb.control('', []),
            bankAccount: this.fb.control('', []),
            verifyAccount: this.fb.control('', [])
        });
    }

    test(): void {
        // console.dir(this.detailForm);
    }

    validateVerifyAccount(): void {
        if (this.detailForm.value.bankAccount > 0 && this.detailForm.controls.bankAccount.valid)
            this.detailForm.controls.verifyAccount.setValidators(Validators.required);
    }

    validateVerifyRouting(): void {
        if (this.detailForm.value.bankRouting > 0 && this.detailForm.controls.bankRouting.valid)
            this.detailForm.controls.verifyRouting.setValidators(Validators.required);
    }

    compareAccounts(): void {
        if (this.detailForm.value.bankAccount === this.detailForm.value.verifyAccount) return;
        this.detailForm.controls.verifyAccount.setErrors({notEqual: true});
    }

    compareRouting(): void {
        if (this.detailForm.value.bankRouting === this.detailForm.value.verifyRouting) return;
        this.detailForm.controls.verifyRouting.setErrors({notEqual: true});
    }

    phoneNoKeyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9\+\-\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                // invalid character, prevent input
                event.preventDefault();
            }
        }
    }

    checkUsernameAvailability():void {
        let usernameInput = _.find(this.inputs.toArray(), (input:MatInput) => {
            return input.ngControl.name === 'username';
        }) as MatInput;

        const username:string = usernameInput.value;
        this.attemptedUsername = username;
        if(username.length < 1) return;

        if(this.userForm.controls.username.errors != null && this.userForm.controls.username.errors.unavailable) {
            this.userForm.patchValue({ username: username });
        } else {
            this.service.checkUsernameAvailability(username)
                .subscribe(available => {
                    this.usernameTaken = !available;

                    if(!available) {
                        this.userForm.get('username').setErrors({ unavailable: true });

                        let lastSection = this.userForm.value.firstName.substr(0, 2).toLowerCase();
                        this.suggestedUsername = this.userForm.value.lastName.substr(0, 5).toLowerCase() + lastSection;

                        usernameInput.focus();
                        usernameInput.value = this.suggestedUsername;
                    }
                });
        }
        
    }

    private createAgentForm(): void {
        this.userEntity =
            this.userEntity == null
                ? <User>{
                      firstName: null,
                      lastName: null
                  }
                : this.userEntity;

        this.agentForm = this.fb.group({
            // firstName: this.fb.control(this.userEntity.firstName, [Validators.required]),
            // lastName: this.fb.control(this.userEntity.lastName, [Validators.required]),
            managerId: this.fb.control('', [Validators.required]),
            isManager: this.fb.control('', [])
        });
    }

    private createRoleTypeForm():void {
        this.roleType = this.fb.control('', [Validators.required]);
    }
}
