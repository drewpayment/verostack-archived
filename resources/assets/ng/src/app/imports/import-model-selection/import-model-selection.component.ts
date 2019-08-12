import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImportsService } from '../imports.service';
import { ImportModel } from '@app/models';
import { Observable } from 'rxjs';

@Component({
    selector: 'vs-import-model-selection',
    templateUrl: './import-model-selection.component.html',
    styleUrls: ['./import-model-selection.component.scss']
})
export class ImportModelSelectionComponent implements OnInit, OnDestroy {

    models: Observable<ImportModel[]>;

    constructor(private service: ImportsService) { }

    ngOnInit() {
        this.models = this.service.getImportModels();
    }

    ngOnDestroy() {
    }

}
