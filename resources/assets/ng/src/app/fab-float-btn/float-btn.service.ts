import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FloatBtnService {
    private _opened:boolean;
    opened$:Subject<boolean> = new Subject<boolean>();

    constructor() {}

    toggle(opened?:boolean):void {
        let value = opened || !this._opened;
        this._opened = value;
        this.opened$.next(this._opened);
    }

    open():void {
        this._opened = true;
        this.opened$.next(true);
    }

    close():void {
        this._opened = false;
        this.opened$.next(false);
    }
}
