import {Injectable} from '@angular/core';
import { MatSidenav, MatDrawerToggleResult } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SidenavService {
    private sidenav:MatSidenav;
    opened$ = new BehaviorSubject<boolean>(false);

    constructor() {
        // if(this.sidenav != null) 
        //     this.opened$.next(this.sidenav.opened);
        // else
        //     this.opened$.next(false);
    }

    open():Promise<MatDrawerToggleResult> {
        this.opened$.next(true);
        return this.sidenav.open();
    }

    close():Promise<MatDrawerToggleResult> {
        this.opened$.next(false);
        if (this.sidenav == null) return;
        return this.sidenav.close();
    }

    toggle(isOpen?:boolean):Promise<MatDrawerToggleResult> {
        if (this.sidenav != null) 
            this.opened$.next(!this.sidenav.opened);
        return this.sidenav.toggle(isOpen);
    }

    setSidenav(nav:MatSidenav):void {
        this.sidenav = nav;
    }
}
