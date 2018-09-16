import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { SessionService } from '../session.service';
import { IUser } from '../models/user.model';
import {
  MatSidenav,
  MatDialog
} from '@angular/material';
import { ClientSelectorComponent } from '../client-selector/client-selector.component';
import { Router } from '@angular/router';
import { UserService } from '../user-features/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private defaultTitle: string = 'Verostack Development';

  isLoggedIn:boolean;
  user:IUser;
  isAdmin:boolean;
  menuTitle: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultTitle);
  showClientSelector:boolean;
  @Input() private sidenav: MatSidenav;
  loggedInStatus:Observable<boolean>;

  constructor(
    private authService:AuthService,
    private userService:UserService,
    private session:SessionService,
    private dialog:MatDialog,
    private router:Router
  ) {
    this.loggedInStatus = this.session.isLoginSubject.asObservable();
    this.loggedInStatus.subscribe((authenticated:boolean) => {
      if(!authenticated) {
        this.menuTitle.next(this.defaultTitle);
      }
    });
    this.session.userItem.subscribe((next:IUser) => {
      this.user = next;
      this.menuTitle.next(this.user.selectedClient.name);
      if(this.user.clients.length > 1) this.showClientSelector = true;
      this.isAdmin = this.user.role.role > 6;
    });
  }

  ngOnInit() {
    this.session.getItem('user');
  }

  onLogout() {
    this.authService.logout()
      .then((url:string) => {
        this.session.navigateByUrl(url);
      });
  }

  /**
   * Uses session service to toggle side nav
   */
  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ClientSelectorComponent, {
      width: '400px',
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('dialog was closed');
    });
  }

}
