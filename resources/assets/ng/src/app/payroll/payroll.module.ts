import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@app/core';
import { MaterialModule } from '@app/material/material.module';
import { LoadingModule } from 'ngx-loading';
import { FabFloatBtnModule } from '@app/fab-float-btn/fab-float-btn.module';
import { PipesModule } from '@app/pipes/pipes.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DirectivesModule } from '@app/directives/directives.module';
import { PayrollDialogComponent } from './payroll-dialog/payroll-dialog.component';
import { PayrollListComponent } from './payroll-list/payroll-list.component';
import { PayrollFilterDialogComponent } from './payroll-filter-dialog/payroll-filter-dialog.component';
import { OverrideExpenseDialogComponent } from './override-expense-dialog/override-expense-dialog.component';
import { ScheduleAutoReleaseDialogComponent } from './schedule-auto-release-dialog/schedule-auto-release-dialog.component';
import { ConfirmAutoreleaseDateDialogComponent } from './confirm-autorelease-date-dialog/confirm-autorelease-date-dialog.component';
import { ConfirmReleaseDialogComponent } from './confirm-release-dialog/confirm-release-dialog.component';
import { GrossTotalReleaseAmountPipe } from './confirm-release-dialog/gross-total-release-amount.pipe';
import { PaycheckListComponent } from './paycheck-list/paycheck-list.component';
import { PayCycleComponent } from './pay-cycle/pay-cycle.component';
import { EditPayCycleComponent } from './pay-cycle/components/edit-pay-cycle/edit-pay-cycle.component';
import { ConfirmUnpaidSelectionDialogComponent } from './pay-cycle/components/confirm-unpaid-selection-dialog/confirm-unpaid-selection-dialog.component';
import { PayCycleDialogComponent } from './pay-cycle/components/pay-cycle-dialog/pay-cycle-dialog.component';
import { RouterModule, Route } from '@angular/router';
import { AuthGuard } from '@app/auth.guard';
import { PaycheckDetailComponent } from './paycheck-detail/paycheck-detail.component';
import { PaycheckDetailService } from './paycheck-detail/paycheck-detail.service';
import { PaycheckDetailGuard } from './paycheck-detail.guard';
import { AgentPayrollViewComponent } from './agent-payroll-view/agent-payroll-view.component';
import { PayCycleTutorialDialogComponent } from './pay-cycle/components/pay-cycle-tutorial-dialog/pay-cycle-tutorial-dialog.component';

const routes:Route[] = [{ 
    path: 'admin/pay', 
    children: [
        { path: 'pay-cycles', component: PayCycleComponent, canActivate: [AuthGuard] },
        { path: 'pay-cycles/edit/:payCycleId', component: EditPayCycleComponent, canActivate: [AuthGuard] },
        { path: 'manage', component: PayrollListComponent, canActivate: [AuthGuard] },
        { path: 'paycheck-list', component: PaycheckListComponent, canActivate: [AuthGuard] },
        { 
            path: 'paycheck-detail', 
            component: PaycheckDetailComponent, 
            canActivate: [PaycheckDetailGuard],
            resolve: {
                data: PaycheckDetailService
            }
        }
    ]
}, {
    path: 'users/payroll',
    children: [
        { path: 'list', component: AgentPayrollViewComponent, canActivate: [AuthGuard] },
        { 
            path: 'paycheck-detail', 
            component: PaycheckDetailComponent, 
            canActivate: [PaycheckDetailGuard],
            resolve: {
                data: PaycheckDetailService
            }
        }
    ]
}];

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        CoreModule,
        LoadingModule,
        FabFloatBtnModule,
        PipesModule,
        DirectivesModule,

        RouterModule.forChild(routes)
    ],
    declarations: [
        PayCycleDialogComponent,
        PayCycleTutorialDialogComponent,
        PayrollDialogComponent,
        PayrollListComponent,
        PayrollFilterDialogComponent,
        OverrideExpenseDialogComponent,
        ScheduleAutoReleaseDialogComponent,
        ConfirmAutoreleaseDateDialogComponent,
        ConfirmReleaseDialogComponent,
        GrossTotalReleaseAmountPipe,
        PaycheckListComponent,
        PayCycleComponent,
        EditPayCycleComponent,
        ConfirmUnpaidSelectionDialogComponent,
        PaycheckDetailComponent,
        AgentPayrollViewComponent
    ],
    exports: [
        // not sure why i was exporting these??? 
        // PayCycleDialogComponent,
        // PayrollDialogComponent,
        // PayrollListComponent,
        // PayrollFilterDialogComponent,
        // OverrideExpenseDialogComponent,
        // ScheduleAutoReleaseDialogComponent,
        // ConfirmAutoreleaseDateDialogComponent,
        // ConfirmReleaseDialogComponent,
        // GrossTotalReleaseAmountPipe,
        // PaycheckListComponent,
        // PayCycleComponent,
        // EditPayCycleComponent,
        // ConfirmUnpaidSelectionDialogComponent
    ],
    entryComponents: [
        PayCycleDialogComponent,
        PayCycleTutorialDialogComponent,
        PayrollDialogComponent,
        ConfirmUnpaidSelectionDialogComponent,
        PayrollFilterDialogComponent,
        OverrideExpenseDialogComponent,
        ScheduleAutoReleaseDialogComponent,
        ConfirmAutoreleaseDateDialogComponent,
        ConfirmReleaseDialogComponent
    ],
    providers: [
        PaycheckDetailService
    ]
})
export class PayrollModule {}
