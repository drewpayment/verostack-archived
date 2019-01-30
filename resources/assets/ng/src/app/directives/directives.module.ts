import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DebounceKeyupDirective} from './debounce-keyup.directive';
import { LetDirective } from './let.directive';
import { ScrollLockDirective } from './scroll-lock.directive';

@NgModule({
    declarations: [
        DebounceKeyupDirective,
        LetDirective,
        ScrollLockDirective
    ],
    imports: [CommonModule],
    exports: [
        DebounceKeyupDirective,
        LetDirective,
        ScrollLockDirective
    ]
})
export class DirectivesModule {}
