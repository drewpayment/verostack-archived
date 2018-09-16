import { NgModule } from "../../../node_modules/@angular/core";
import { FabFloatBtnComponent } from "@app/fab-float-btn/fab-float-btn.component";
import { CommonModule } from "../../../node_modules/@angular/common";
import { BrowserAnimationsModule } from "../../../node_modules/@angular/platform-browser/animations";
import { MaterialModule } from "@app/material/material.module";
import { BrowserModule } from "../../../node_modules/@angular/platform-browser";
import { NO_ERRORS_SCHEMA } from "../../../node_modules/@angular/compiler/src/core";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [
    FabFloatBtnComponent
  ],
  exports: [
    FabFloatBtnComponent
  ],
  // schemas: [
  //   NO_ERRORS_SCHEMA
  // ]
})
export class FabFloatBtnModule {
  constructor() {}
}
