import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyInformationComponent } from './my-information/my-information.component';
import { ClientInformationComponent } from './client-information/client-information.component';
import { PayrollComponent } from './payroll/payroll.component';
import { AppComponent } from './app.component';

import { AuthGuard } from './auth.guard';
import { CampaignsComponent } from '@app/campaigns/campaigns.component';

import { DailySaleTrackerComponent } from '@app/daily-sale-tracker/daily-sale-tracker.component';
import { environment } from '@env/environment';
import { AgentComponent } from '@app/agent/agent.component';
import { PublicHomeComponent } from '@app/public-home/public-home.component';
import { PayCycleComponent } from '@app/pay-cycle/pay-cycle.component';
import { EditPayCycleComponent } from '@app/pay-cycle/components/edit-pay-cycle/edit-pay-cycle.component';
import { CampaignDetailComponent } from '@app/campaigns/components/campaign-detail/campaign-detail.component';
import { UtilityDetailComponent } from './campaigns/components/utility-detail/utility-detail.component';
import { NewSaleComponent } from './daily-sale-tracker/components/new-sale/new-sale.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: PublicHomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'my-information', component: MyInformationComponent, canActivate: [AuthGuard] },
    { path: 'client-information', component: ClientInformationComponent, canActivate: [AuthGuard] },
    { path: 'campaigns', component: CampaignsComponent, canActivate: [AuthGuard] },
    { path: 'campaigns/:campaignId', component: CampaignDetailComponent, canActivate: [AuthGuard] },
    { path: 'utilities/:utilityId', component: UtilityDetailComponent, canActivate: [AuthGuard] },
    { path: 'add-utility', component: UtilityDetailComponent, canActivate: [AuthGuard] }, 
    { path: 'payroll-tools', component: PayrollComponent, canActivate: [AuthGuard] },
    { 
        path: 'admin', 
        children: [
            { path: 'pay', component: PayCycleComponent, canActivate: [AuthGuard] },
            { path: 'pay/edit/:payCycleId', component: EditPayCycleComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: 'agents', component: AgentComponent, canActivate: [AuthGuard] },
    { path: 'daily-tracker', component: DailySaleTrackerComponent, canActivate: [AuthGuard] },
    { path: 'new-sale-contact', component: NewSaleComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'home' }
]

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(
      routes,
      {
        useHash: true,
        // enableTracing: !environment.production // used to debug routing, consoles all router methods
      }
    )
  ]
})
export class AppRoutingModule { }
