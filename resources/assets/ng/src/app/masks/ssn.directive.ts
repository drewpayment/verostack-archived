import { Directive, OnInit } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';

/**
 * https://stackoverflow.com/questions/37800841/input-mask-fields-in-angular2-forms
 * This isn't working yet, need to better understand how directives interact with input fields.
 *
*/
@Directive({
  selector: '[ngModel][maskssn]',
  host: {
    '(ngModelChange)': 'onInputChange($event)',
    '(keydown.baskspace)': 'onInputChange($event.target.value, true)'
  }
})
export class MaskSsn implements OnInit {
  ssn: string;

  constructor(public model: NgModel) {}

  ngOnInit() {
    if(this.model.model.length > 0 && this.model.model.length < 12) {
      this.ssn = this.model.model.slice(0, 3) + '-' + this.model.model.slice(3, 5) + '-' + this.model.model.slice(5, 9);
      this.model.valueAccessor.writeValue(this.model.model.slice(0, 3) + '-' + this.model.model.slice(3, 5) + '-' + this.model.model.slice(5, 9));
    }
  }

  onInputChange(event, backspace) {
    // remove all casting characters and set ssn value to new value
    for(var i = 0; i < event.length; i++) {
      let pos = event.charAt(i);
      if(isNaN(parseInt(pos, 10))) {
        event = event.replaceAt(pos, this.model.value.charAt(i));
      }
      this.ssn = event;
    }

    this.model.valueAccessor.writeValue(this.model.model.slice(0, 3) + '-' + this.model.model.slice(3, 5) + '-' + this.model.model.slice(5, 9));
  }

}
