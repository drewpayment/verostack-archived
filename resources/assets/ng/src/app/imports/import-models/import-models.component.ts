import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatCheckboxChange, MatDialog } from '@angular/material';
import { ImportModel, User } from '@app/models';
import { ImportsService } from '../imports.service';
import { AddImportModelComponent } from '../dialogs/add-import-model/add-import-model.component';

@Component({
    selector: 'vs-import-models',
    templateUrl: './import-models.component.html',
    styleUrls: ['./import-models.component.scss']
})
export class ImportModelsComponent implements OnInit {

    user:User;
    dataSource:ImportModel[];
    isFabOpen$ = new BehaviorSubject<boolean>(false);

    constructor(private service:ImportsService, private dialog:MatDialog) { }

    ngOnInit() {
        this.service.getImportModels().subscribe(models => {
            this.dataSource = models;
        });
    }

    addImportModel() {
        this.isFabOpen$.next(true);
        this.dialog.open(AddImportModelComponent, {
            data: {
                user: this.user,
            },
            width: '60vw',
            autoFocus: false,
        })
        .afterClosed()
        .subscribe(result => {
            this.isFabOpen$.next(false);
            if (!result) return;

            console.dir(result);
        });
    }

    changeActiveStatus(event:MatCheckboxChange) {
        console.dir(event);
    }

}
