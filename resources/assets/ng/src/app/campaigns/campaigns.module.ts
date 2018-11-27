import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsComponent } from './campaigns.component';
import { MaterialModule } from '@app/material/material.module';
import { NewCampaignDialogComponent } from './new-campaign-dialog/new-campaign-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FabFloatBtnModule } from '@app/fab-float-btn/fab-float-btn.module';
import { QuillModule } from 'ngx-quill';
import { CampaignFilterDialogComponent } from './campaign-filter-dialog/campaign-filter-dialog.component';
import { CampaignDetailComponent } from './components/campaign-detail/campaign-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserModule,
    FabFloatBtnModule,
    QuillModule
  ],
  declarations: [
    CampaignsComponent,
    NewCampaignDialogComponent,
    CampaignFilterDialogComponent,
    CampaignDetailComponent
  ],
  entryComponents: [
    NewCampaignDialogComponent,
    CampaignFilterDialogComponent
  ]
})
export class CampaignsModule { }
