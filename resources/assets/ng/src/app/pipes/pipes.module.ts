import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhonePipe} from '@app/pipes/phone.pipe';
import { MaterialModule } from '@app/material/material.module';
import { CurrencyInputPipe } from './currency-input.pipe';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [PhonePipe, CurrencyInputPipe],
    exports: [PhonePipe, CurrencyInputPipe]
})
export class PipesModule {}
