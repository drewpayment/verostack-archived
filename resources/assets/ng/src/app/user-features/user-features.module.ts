import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, RequiredValidator } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FileUploadModule } from 'ng2-file-upload';

import { WeatherService } from '../weather.service';

import { MyInformationComponent } from '../my-information/my-information.component';
import { UserService } from './user.service';
import { PayrollComponent } from '../payroll/payroll.component';
import { ChangeAgentDialogComponent } from '../payroll/dialogs/change-agent.component';
import { RejectNoteDialogComponent } from '../payroll/dialogs/reject-note.component';
import { SalesMappingComponent } from '../payroll/dialogs/sales-mapping.component';

// import { HotTableModule } from '@handsontable/angular';

import { MaskSsn } from '../masks/ssn.directive';
import { RequiredValidatorDirective } from '../validators/required-validator.directive';
import { CampaignsModule } from '@app/campaigns/campaigns.module';
import { VsPasteDirective } from '@app/payroll/paste.directive';

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    CampaignsModule
  ],
  declarations: [
    MyInformationComponent,
    PayrollComponent,
    ChangeAgentDialogComponent,
    MaskSsn,
    RejectNoteDialogComponent,
    SalesMappingComponent,
    RequiredValidatorDirective,
    VsPasteDirective
  ],
  entryComponents: [
    RejectNoteDialogComponent,
    SalesMappingComponent,
    ChangeAgentDialogComponent
  ],
  providers: [WeatherService, UserService]
})
export class UserFeaturesModule { }
