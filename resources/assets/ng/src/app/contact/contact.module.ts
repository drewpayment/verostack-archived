import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/auth.guard';
import { MaterialModule } from '@app/material/material.module';
import { FabFloatBtnModule } from '@app/fab-float-btn/fab-float-btn.module';
import { ContactOutletComponent } from './contact-outlet/contact-outlet.component';
import { PipesModule } from '@app/pipes/pipes.module';

const routes: Route[] = [
    { 
        path: '', 
        component: ContactOutletComponent, canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: ContactListComponent, canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule, 
        MaterialModule,
        PipesModule,

        RouterModule.forChild(routes)
    ],

    declarations: [
        ContactListComponent,
        ContactOutletComponent
    ],

    exports: [
        ContactListComponent,
        ContactOutletComponent
    ]
})
export class ContactModule {}
