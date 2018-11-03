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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgentComponent } from './agent/agent.component';
import { FabFloatBtnModule } from '@app/fab-float-btn/fab-float-btn.module';
import { PipesModule } from '@app/pipes/pipes.module';
import { EditAgentDialogComponent } from './agent/edit-agent-dialog/edit-agent-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PublicHomeComponent } from './public-home/public-home.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    CoreModule,
    MaterialModule,
    LoadingModule,
    AppRoutingModule,
    FabFloatBtnModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    SidenavComponent,
    ScrollLockDirective,
    HeaderComponent,
    AgentComponent,
    EditAgentDialogComponent,
    PublicHomeComponent
  ],
  entryComponents: [
    EditAgentDialogComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
