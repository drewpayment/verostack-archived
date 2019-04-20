import { NgModule } from '@angular/core';
import { FabFloatBtnComponent } from '@app/fab-float-btn/fab-float-btn.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/material/material.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        CommonModule, 
        // BrowserModule, 
        // BrowserAnimationsModule, 
        MaterialModule
    ],
    declarations: [FabFloatBtnComponent],
    exports: [FabFloatBtnComponent]
})
export class FabFloatBtnModule {
    constructor() { }
}
