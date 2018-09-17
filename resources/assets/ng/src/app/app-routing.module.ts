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
import { AgentsComponent } from '@app/core/agents/agents.component';
import { DailySaleTrackerComponent } from '@app/daily-sale-tracker/daily-sale-tracker.component';
import { environment } from '@env/environment';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
      path: '',
      canActivate: [AuthGuard],
      children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'my-information', component: MyInformationComponent },
        { path: 'client-information', component: ClientInformationComponent },
        { path: 'campaigns', component: CampaignsComponent },
        { path: 'payroll-tools', component: PayrollComponent },
        { path: 'agents', component: AgentsComponent },
        { path: 'daily-tracker', component: DailySaleTrackerComponent },
        { path: '', redirectTo: 'login', pathMatch: 'full' },
      ]
    },
    { path: '**', component: AppComponent }
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
