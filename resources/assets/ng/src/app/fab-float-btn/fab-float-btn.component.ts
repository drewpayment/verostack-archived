import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FloatBtnService } from './float-btn.service';

@Component({
  selector: 'vs-float-button',
  templateUrl: './fab-float-btn.component.html',
  styleUrls: ['./fab-float-btn.component.scss'],
  providers: [
    FloatBtnService
  ]
})
export class FabFloatBtnComponent implements OnInit {
  @Output() callback:EventEmitter<any> = new EventEmitter();
  @Input() isOpen:Observable<boolean>;

  @Input('aria-label') ariaLabel:string;
  @Input('mat-icon') matIcon:string;
  @Input('is-mini') isMini:boolean;
  @Input() disabled = 'false';
  private _position:string;
  @Input() 
  set position(value:string) {
    if (typeof value !== 'string') {
      value = '';
    } 
    this._position = value.toLowerCase();
  }
  get position():string {
    return this._position;
  }
  @Input('color') colorType = 'accent';
  get positionClass() {
    return this.position === 'tl' 
      ? 'top-left'
      : this.position === 'tr'
      ? 'top-right'
      : this.position === 'bl'
      ? 'bottom-left'
      : 'bottom-right';
  }

  buttonType:string;

  constructor(private svc:FloatBtnService) {}

  ngOnInit() {
    this.svc.opened$.subscribe(o => of(this.isOpen));
    this.buttonType = this.isMini ? 'mat-mini-fab' : 'mat-fab';
  }

  onClick():void {
    // call the callback!
    this.callback.emit();
  }

}
