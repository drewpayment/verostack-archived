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

const routes: Routes = [
  // {
  //   path: '',
  //   canActivate: [AuthGuard],
  //   children: [
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'my-information', component: MyInformationComponent, canActivate: [AuthGuard] },
      { path: 'client-information', component: ClientInformationComponent, canActivate: [AuthGuard] },
      { path: 'campaigns', component: CampaignsComponent, canActivate: [AuthGuard] },
      { path: 'payroll-tools', component: PayrollComponent, canActivate: [AuthGuard] },
      { path: 'agents', component: AgentsComponent, canActivate: [AuthGuard] },
      { path: 'daily-tracker', component: DailySaleTrackerComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [AuthGuard] },
      { path: '**', component: AppComponent }
  //   ]
  // }
]

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(
      routes,
      {
        useHash: true
      }
      // { enableTracing: true } // <-- debugging only, remove before production
    )
  ]
})
export class AppRoutingModule { }
