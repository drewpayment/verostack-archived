import {Directive, OnInit, Output, EventEmitter, HostListener} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
    selector: '[debounceKeyup]'
})
export class DebounceKeyupDirective implements OnInit {
    
    @Output() debounceKeyup = new EventEmitter();
    private keyups = new Subject();
    constructor() {}

    ngOnInit(): void {
        this.keyups.pipe(
            debounceTime(250)
        ).subscribe(e => this.debounceKeyup.emit(e));
    }

    @HostListener('keyup', ['$event'])
    keyup(event) {
        event.preventDefault();
        event.stopPropagation();
        this.keyups.next(event);
    }
}
