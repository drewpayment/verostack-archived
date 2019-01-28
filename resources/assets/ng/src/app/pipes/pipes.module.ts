import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhonePipe} from '@app/pipes/phone.pipe';
import { MaterialModule } from '@app/material/material.module';
import { CurrencyInputPipe } from './currency-input.pipe';
import { PayrollDetailTotalsPipe } from './payroll-detail-totals.pipe';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [PhonePipe, CurrencyInputPipe, PayrollDetailTotalsPipe],
    exports: [PhonePipe, CurrencyInputPipe, PayrollDetailTotalsPipe]
})
export class PipesModule {}
