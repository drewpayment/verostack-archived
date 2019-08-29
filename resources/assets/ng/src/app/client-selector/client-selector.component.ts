import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { User, IClient } from '../models/index';
import { Observable ,  BehaviorSubject, Subscription } from 'rxjs';
import { UserService } from '../user-features/user.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-selector',
  templateUrl: './client-selector.component.html',
  styleUrls: ['./client-selector.component.css']
})
export class ClientSelectorComponent implements OnInit, OnDestroy {
  user: User;
  clientControl: FormControl = new FormControl('', [Validators.required]);

  subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<ClientSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public auth: AuthService,
    public userService: UserService,
    private location:Location,
    private router:Router
  ) {}

  ngOnInit() {
    this.subscriptions.push(this.userService.user.subscribe((next: User) => {
      this.user = next;

      this.clientControl.setValue(this.user.sessionUser.sessionClient, { emitEvent: false });
    }));
  }

  ngOnDestroy() {
      this.subscriptions.forEach((s, i, a) => {
          s.unsubscribe();
      });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  onClientChange() {
    const clientId = this.clientControl.value;
    if (clientId == null) return;

    this.userService.changeClient(clientId)
        .subscribe(result => {
            if (!result) return;

            this.router.navigate(['client-information']);
            this.cancel();
        });
  }

  compareFn: ((f1: any, f2: any) => boolean)|null = this.compareByValue;

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.clientId === f2.clientId;
  }

}
