import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { AuthService } from '../auth.service';
import { User, IClient } from '../models/index';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { UserService } from '../user-features/user.service';

@Component({
  selector: 'app-client-selector',
  templateUrl: './client-selector.component.html',
  styleUrls: ['./client-selector.component.css']
})
export class ClientSelectorComponent implements OnInit {
  user: User;
  clientControl: FormControl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<ClientSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public auth: AuthService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.userService.user.subscribe((next: User) => {
      this.user = next;
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  onClientChange() {
    this.userService.updateUser(this.user, null).subscribe();
    this.cancel();
  }

  compareFn: ((f1: any, f2: any) => boolean)|null = this.compareByValue;

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.clientId === f2.clientId;
  }

}
