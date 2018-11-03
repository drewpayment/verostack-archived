import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { SelectMapperComponent } from '../select-mapper/select-mapper.component';
import { ClientInformationComponent } from '../client-information/client-information.component';
import { ClientSelectorComponent } from '../client-selector/client-selector.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ChartJsContent } from "../dashboard/chart-js-content";
import { LoginComponent } from '../login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material.module';
import { AgentAddSaleDialog } from '@app/dashboard/dialogs/add-sale-dialog.component';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PortalModule,
    MaterialModule
  ],
  declarations: [
    LoginComponent,
    ChartJsContent,
    DashboardComponent,
    ClientSelectorComponent,
    ClientInformationComponent,
    SelectMapperComponent,
    LoadingSpinnerComponent,
    AgentAddSaleDialog
  ],
  entryComponents: [
    AgentAddSaleDialog
  ]
})
export class BaseModule { }
