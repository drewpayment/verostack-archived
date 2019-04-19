import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/auth.guard';
import { MaterialModule } from '@app/material/material.module';
import { FabFloatBtnModule } from '@app/fab-float-btn/fab-float-btn.module';
import { ContactOutletComponent } from './contact-outlet/contact-outlet.component';
import { PipesModule } from '@app/pipes/pipes.module';
import { KnockListComponent } from './knock-list/knock-list.component';
import { KnockListService } from './knock-list/knock-list.service';

const routes: Route[] = [
    { 
        path: '', 
        component: ContactOutletComponent, canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: ContactListComponent, canActivate: [AuthGuard] },
            { 
                path: 'knock-list', 
                component: KnockListComponent, 
                canActivate: [AuthGuard],
                resolve: {
                    contacts: KnockListService
                }
            }
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
        ContactOutletComponent,
        KnockListComponent
    ],

    exports: [
        ContactListComponent,
        ContactOutletComponent
    ],

    providers: [
        KnockListService
    ]
})
export class ContactModule {}
