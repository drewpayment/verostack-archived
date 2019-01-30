import {NgModule} from '@angular/core';
import {CoreModule} from './core/core.module';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {MaterialModule} from './material/material.module';
import {LoadingModule} from 'ngx-loading';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AgentComponent} from './agent/agent.component';
import {FabFloatBtnModule} from '@app/fab-float-btn/fab-float-btn.module';
import {PipesModule} from '@app/pipes/pipes.module';
import {EditAgentDialogComponent} from './agent/edit-agent-dialog/edit-agent-dialog.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {PublicHomeComponent} from './public-home/public-home.component';
import {AgentRulesDialogComponent} from './agent/agent-rules-dialog/agent-rules-dialog.component';
import {NewSaleComponent} from './daily-sale-tracker/components/new-sale/new-sale.component';
import {DirectivesModule} from './directives/directives.module';
import { PayrollModule } from './payroll/payroll.module';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        BrowserModule,
        CoreModule,
        MaterialModule,
        LoadingModule,
        FabFloatBtnModule,
        PipesModule,
        ReactiveFormsModule,
        FormsModule,
        DirectivesModule,
        PayrollModule,

        /** ROUTING FOR ENTIRE APPLICATION */
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        SidenavComponent,
        HeaderComponent,
        AgentComponent,
        EditAgentDialogComponent,
        PublicHomeComponent,
        AgentRulesDialogComponent,
        NewSaleComponent
    ],
    entryComponents: [
        EditAgentDialogComponent,
        AgentRulesDialogComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
