import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebounceKeyupDirective } from './debounce-keyup.directive';

@NgModule({
  declarations: [DebounceKeyupDirective],
  imports: [
    CommonModule
  ],
  exports: [
      DebounceKeyupDirective
  ]
})
export class DirectivesModule { }
