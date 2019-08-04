import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material/material.module';
import { PipesModule } from '@app/pipes/pipes.module';
import { FabFloatBtnModule } from '@app/fab-float-btn/fab-float-btn.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImportModelsComponent } from './import-models/import-models.component';
import { AuthGuard } from '@app/auth.guard';
import { AddImportModelComponent } from './dialogs/add-import-model/add-import-model.component';
import { EditImportModelComponent } from './dialogs/edit-import-model/edit-import-model.component';
import { SpreadsheetModule } from '@app/spreadsheet/spreadsheet.module';

const routes: Route[] = [
    { path: '', redirectTo: 'models', pathMatch: 'full' },
    { path: 'models', component: ImportModelsComponent, canActivate: [AuthGuard] },
];

@NgModule({
    declarations: [
        ImportModelsComponent,
        AddImportModelComponent,
        EditImportModelComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        PipesModule,
        FabFloatBtnModule,
        FormsModule,
        ReactiveFormsModule,
        SpreadsheetModule,

        RouterModule.forChild(routes)
    ],
    entryComponents: [
        AddImportModelComponent,
        EditImportModelComponent
    ]
})
export class ImportsModule { }
