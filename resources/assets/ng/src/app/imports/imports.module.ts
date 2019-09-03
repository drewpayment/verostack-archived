import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material/material.module';
import { PipesModule } from '@app/pipes/pipes.module';
import { FabFloatBtnModule } from '@app/fab-float-btn/fab-float-btn.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImportModelsComponent } from './import-models/import-models.component';
import { AuthGuard } from '@app/auth.guard';
import { EditImportModelComponent } from './dialogs/edit-import-model/edit-import-model.component';
import { SpreadsheetModule } from '@app/spreadsheet/spreadsheet.module';
import { MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
import { ConfirmAgentBottomSheetComponent } from './bottom-sheets/confirm-agent-code.component';
import { ProcessComponent } from './process/process.component';
import { PastImportsComponent } from './past-imports/past-imports.component';
import { ImportModelSelectionComponent } from './import-model-selection/import-model-selection.component';
import { CampaignsSelectionComponent } from './widgets/campaigns-selection/campaigns-selection.component';
import { AdFileUploadModule } from 'ad-file-upload';

const routes: Route[] = [
    { path: '', redirectTo: 'models', pathMatch: 'full' },
    { path: 'process', component: ProcessComponent, canActivate: [AuthGuard] },
    { path: 'models', component: ImportModelsComponent, canActivate: [AuthGuard] },
];

@NgModule({
    declarations: [
        ImportModelsComponent,
        EditImportModelComponent,
        ConfirmAgentBottomSheetComponent,
        ProcessComponent,
        PastImportsComponent,
        ImportModelSelectionComponent,
        CampaignsSelectionComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        PipesModule,
        FabFloatBtnModule,
        FormsModule,
        ReactiveFormsModule,
        SpreadsheetModule,
        AdFileUploadModule,

        RouterModule.forChild(routes)
    ],
    entryComponents: [
        EditImportModelComponent,
        ConfirmAgentBottomSheetComponent
    ],
    providers: [
        { provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    ]
})
export class ImportsModule { }
