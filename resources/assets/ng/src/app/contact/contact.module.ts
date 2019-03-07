import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/auth.guard';
import { MaterialModule } from '@app/material/material.module';
import { FabFloatBtnModule } from '@app/fab-float-btn/fab-float-btn.module';

const routes: Route[] = [
    { path: '', component: ContactListComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        CommonModule, 
        MaterialModule,

        RouterModule.forChild(routes)
    ],

    declarations: [
        ContactListComponent
    ],

    exports: [
        ContactListComponent
    ]
})
export class ContactModule {}
