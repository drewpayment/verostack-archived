import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MaterialModule } from './material/material.module';
import { ScrollLockDirective } from './scroll-lock.directive';
import { LoadingModule } from 'ngx-loading';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    CoreModule,
    MaterialModule,
    LoadingModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    SidenavComponent,
    ScrollLockDirective,
    HeaderComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
