import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
        CampaignsModule,
        UserFeaturesModule,
        ReactiveFormsModule,
        BaseModule
    ],
    // declarations: [
    //     ClientSelectorComponent,
    //     SelectMapperComponent,
    //     LoadingSpinnerComponent
    // ],
    //   entryComponents: [
    //     ClientSelectorComponent,
    //     SelectMapperComponent,
    //     LoadingSpinnerComponent
    //   ],
    // exports: [ClientSelectorComponent, SelectMapperComponent, LoadingSpinnerComponent],
    
    providers: []
})
export class SharedModule {}
