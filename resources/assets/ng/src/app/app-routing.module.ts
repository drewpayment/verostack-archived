import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyInformationComponent } from './my-information/my-information.component';
import { ClientInformationComponent } from './client-information/client-information.component';

import { AuthGuard } from './auth.guard';
import { CampaignsComponent } from '@app/campaigns/campaigns.component';

import { DailySaleTrackerComponent } from '@app/daily-sale-tracker/daily-sale-tracker.component';
import { AgentComponent } from '@app/agent/agent.component';
import { PublicHomeComponent } from '@app/public-home/public-home.component';
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
    { path: 'agents', component: AgentComponent, canActivate: [AuthGuard] },
    { path: 'daily-tracker', component: DailySaleTrackerComponent, canActivate: [AuthGuard] },
    { path: 'new-sale-contact', component: NewSaleComponent, canActivate: [AuthGuard] },
    { path: 'contacts', loadChildren: './contact/contact.module#ContactModule' },
    { path: 'imports', loadChildren: './imports/imports.module#ImportsModule' },
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
