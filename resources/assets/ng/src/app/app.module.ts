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
import { environment } from '@env/environment';
import { SharedModule } from './shared';
import { BaseModule } from './base/base.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './http/error-interceptor';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BuoyModule } from './buoy/buoy.module';
import { BuoyConfig, buoyConfig, BuoyHeadersManipulator } from './buoy/buoy-config';
import { Buoy } from './buoy/buoy';
import { RefreshComponent } from './refresh/refresh.component';

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
        BaseModule,
        BuoyModule,

        /** ROUTING FOR ENTIRE APPLICATION */
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        SidenavComponent,
        HeaderComponent,
        AgentComponent,
        EditAgentDialogComponent,
        PublicHomeComponent,
        AgentRulesDialogComponent,
        NewSaleComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        RefreshComponent,
    ],
    entryComponents: [
        EditAgentDialogComponent,
        AgentRulesDialogComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        },
        { provide: BuoyConfig, useValue: buoyConfig }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private buoy: Buoy, private localStorage: LocalStorage) {
        // <!-- Global site tag (gtag.js) - Google Analytics -->
        if (environment.production) {
            const head = document.getElementsByTagName('head')[0];
            const gtagmgrNode = document.createElement('script');
            gtagmgrNode.src = 'https://www.googletagmanager.com/gtag/js?id=UA-135392629-1';
            gtagmgrNode.async = true;
            gtagmgrNode.charset = 'utf-8';

            const gtagCodeNode = document.createElement('script');
            gtagCodeNode.innerText = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'UA-135392629-1');
            `;
            
            head.prepend(gtagmgrNode);
            head.insertBefore(gtagCodeNode, head.childNodes[1]);
        }

        // Register middleware 
        this.buoy.registerMiddleware(
            BuoyHeadersManipulator,
            [this.localStorage]
        );
    }
}
