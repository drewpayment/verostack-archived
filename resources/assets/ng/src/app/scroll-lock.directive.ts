import {
  Directive,
  ElementRef,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[scrollLock]',
  inputs: ['trapScroll']
})
export class ScrollLockDirective implements OnInit, OnChanges, OnDestroy {

  trapScroll:boolean | string;

  private element:HTMLElement;

  constructor(elementRef:ElementRef, private zone:NgZone) {
    this.element = elementRef.nativeElement;
  }

  ngOnChanges():void {
    this.trapScroll = this.parseBoolean(this.trapScroll);

    if(this.element.tabIndex >= -1) {
      this.element.tabIndex = -1;
    } else {
      this.element.removeAttribute('tabIndex');
    }
  }

  ngOnDestroy():void {
    this.element.removeEventListener('wheel', this.handleEvent, false);
  }

  ngOnInit():void {
    this.zone.runOutsideAngular(
      ():void => {
        // NOTE: All modern browsers support "wheel". As such, we'll apply this
        // as a progressive enhancement and not worry about older browsers.
        this.element.addEventListener("wheel", this.handleEvent, false);
        this.element.addEventListener("keydown", this.handleEvent, false);
      }
    )
  }

  // private methods

  private handleEvent = (event: WheelEvent | KeyboardEvent):void => {
    if(!this.isTrappingEvent(event)) return;

    // Regardless of whether or not we're going to allow this event to be applied
    // locally, we want to stop the event from propagating above this container. This way,
    // we make sure that an acestor instance higher up in the DOM, doesn't accidentally interfere
    // with the default behavior being applied locally.
    event.stopPropagation();

    if(this.eventShouldBePrevented(event)) event.preventDefault();
  }

  private eventShouldBePrevented(event:WheelEvent | KeyboardEvent):boolean {
    let target = <HTMLElement>event.target;

    // check for embedded scrolling opportunities
    while(target !== this.element) {
      // if the event will cause scrolling in an embedded event, then we do not
      // want to prevent the default behavior of the event.
      if(this.isScrollableElement(target)) return false;
      target = <HTMLElement>target.parentNode;
    }

    // if we've made it this far, there weren't any embedded scrollable elements to
    // inspect. As such, we can now examine the container. If the event will cause
    // scrolling in container element, then we DO NOT want to prevent
    return true;
  }

  private isScrollableElement(element:HTMLElement):boolean {
    if(getComputedStyle(element).overflowY === 'hidden') return false;
    return element.scrollHeight !== element.clientHeight;
  }

  private isTrappingEvent(event:WheelEvent | KeyboardEvent):boolean {
    if(!this.trapScroll) return false;
    return true;
  }

  private parseBoolean(value:boolean | string):boolean {
    return value == true;
  }

}
