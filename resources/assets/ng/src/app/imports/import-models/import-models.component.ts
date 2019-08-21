import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatCheckboxChange, MatDialog } from '@angular/material';
import { ImportModel, User } from '@app/models';
import { ImportsService } from '../imports.service';
import { SessionService } from '@app/session.service';
import { EditImportModelComponent } from '../dialogs/edit-import-model/edit-import-model.component';

@Component({
    selector: 'vs-import-models',
    templateUrl: './import-models.component.html',
    styleUrls: ['./import-models.component.scss']
})
export class ImportModelsComponent implements OnInit {

    user:User;
    importModels = new BehaviorSubject<ImportModel[]>(null);
    isFabOpen$ = new BehaviorSubject<boolean>(false);

    constructor(private service:ImportsService, private dialog:MatDialog, private session: SessionService) { }

    ngOnInit() {
        this.service.getImportModels().subscribe(models => {
            this.importModels.next(models);
        });

        this.service.fetchCampaigns();
    }

    addImportModel() {
        this.isFabOpen$.next(true);
        this.dialog.open(EditImportModelComponent, {
            data: {
                // user: this.user,
            },
            width: '50vw',
            autoFocus: false,
        })
        .afterClosed()
        .subscribe((model: ImportModel) => {
            this.isFabOpen$.next(false);
            if (!model) return;

            this.session.showLoader();
            this.service.saveImportModel(model).subscribe(res => {
                this.session.hideLoader();
                
                const models = this.importModels.value;
                models.push(res);
                this.importModels.next(models);
            });
        });
    }

    editImportModel(model: ImportModel) {
        this.isFabOpen$.next(true);
        this.dialog.open(EditImportModelComponent, {
            data: {
                importModel: model,
            },
            width: '50vw',
            autoFocus: false,
        })
        .afterClosed()
        .subscribe((model: ImportModel) => {
            this.isFabOpen$.next(false);
            if (!model) return;
            console.dir(model);

            this.session.showLoader();
            this.service.saveImportModel(model).subscribe(res => {
                this.session.hideLoader();

                const models = this.importModels.value;
                models.forEach((m, i, a) => {
                    if (m.importModelId == res.importModelId) {
                        a[i] = res;
                    }
                });
                this.importModels.next(models);
            });
        });
    }

    changeActiveStatus(event:MatCheckboxChange) {
        console.dir(event);
    }

}
