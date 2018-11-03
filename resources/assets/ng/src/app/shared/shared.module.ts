import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { UserFeaturesModule } from '../user-features/user-features.module';
import { ClientSelectorComponent } from '../client-selector/client-selector.component';
import { SelectMapperComponent } from '../select-mapper/select-mapper.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { BaseModule } from '@app/base/base.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    FormsModule,
    MomentModule,
    CampaignsModule,
    UserFeaturesModule,
    ReactiveFormsModule,
    BaseModule
  ],
  entryComponents: [
    ClientSelectorComponent,
    SelectMapperComponent,
    LoadingSpinnerComponent
  ],
  declarations: [],
  providers: []
})
export class SharedModule { }
