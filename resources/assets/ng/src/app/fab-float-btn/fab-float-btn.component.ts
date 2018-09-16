import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'vs-float-button',
  templateUrl: './fab-float-btn.component.html',
  styleUrls: ['./fab-float-btn.component.scss']
})
export class FabFloatBtnComponent implements OnInit {
  @Output() callback:EventEmitter<any> = new EventEmitter();
  @Input() isOpen:Observable<boolean>;

  colorType:string;
  ariaLabel:string;
  matIcon:string;
  isMini:boolean;
  disabled:string;
  position:string;

  topLeft:boolean;
  topRight:boolean;
  bottomLeft:boolean;
  bottomRight:boolean;

  buttonType:string;

  constructor(el:ElementRef) {
    let element = el.nativeElement;
    this.colorType = element.getAttribute('color') || null;
    this.ariaLabel = element.getAttribute('aria-label') || null;
    this.matIcon = element.getAttribute('mat-icon') || null;
    this.isMini = element.getAttribute('is-mini') != null ? true : false;
    this.disabled = element.getAttribute('disabled') != null ? 'disabled' : 'false';
    this.position = element.getAttribute('position');
    this.topLeft = this.position == 'tl';
    this.topRight = this.position == 'tr';
    this.bottomLeft = this.position == 'bl';
    this.bottomRight = this.position == 'br'
      ? true
      : (!this.topLeft && !this.topRight && !this.bottomLeft)
      ? true
      : false;
  }

  ngOnInit() {
    this.buttonType = this.isMini ? 'mat-mini-fab' : 'mat-fab';
  }

  onClick():void {
    // call the callback!
    this.callback.emit('any');
  }

}
