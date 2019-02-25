import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from '../auth.guard';
import { TokenInterceptor } from '../token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { MomentModule } from 'angular2-moment';
import { SharedModule } from '@app/shared';
import { MessagesComponent } from '@app/messages/messages.component';
import { FabFloatBtnModule } from '@app/fab-float-btn/fab-float-btn.module';
import { AddAgentDialogComponent } from '@app/core/agents/dialogs/add-agent.component';
import { AddSaleStatusDialog } from '@app/client-information/dialogs/add-sale-status.component';
import { AddSaleDialog } from '@app/daily-sale-tracker/dialogs/add-sale.component';
import { DailySaleTrackerComponent } from '@app/daily-sale-tracker/daily-sale-tracker.component';
import { DeleteSaleDialog } from '@app/daily-sale-tracker/dialogs/delete-sale.component';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '@app/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    MomentModule,
    FabFloatBtnModule,
    RouterModule,
    DirectivesModule
  ],
  declarations: [
    MessagesComponent,
    AddAgentDialogComponent,
    AddSaleStatusDialog,
    AddSaleDialog,
    DailySaleTrackerComponent,
    DeleteSaleDialog
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    AddAgentDialogComponent,
    AddSaleStatusDialog,
    AddSaleDialog,
    DeleteSaleDialog
  ]
})
export class CoreModule {

  /**
   * Make sure CoreModule is imported only by one NgModule - the AppModule
   */
  constructor(
    @Optional() @SkipSelf() parentModule:CoreModule
  ) {
    if(parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule.');
    }
  }
}
