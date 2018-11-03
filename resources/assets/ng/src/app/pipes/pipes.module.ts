import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhonePipe} from '@app/pipes/phone.pipe';
import { MaterialModule } from '@app/material/material.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [PhonePipe],
    exports: [PhonePipe]
})
export class PipesModule {}
