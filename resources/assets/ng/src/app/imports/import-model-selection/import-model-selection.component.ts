import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ImportsService } from '../imports.service';
import { ImportModel } from '@app/models';
import { Observable } from 'rxjs';
import { MatRadioChange } from '@angular/material';

@Component({
    selector: 'vs-import-model-selection',
    templateUrl: './import-model-selection.component.html',
    styleUrls: ['./import-model-selection.component.scss']
})
export class ImportModelSelectionComponent implements OnInit, OnDestroy {

    models: Observable<ImportModel[]>;

    @Output() readonly change: EventEmitter<MatRadioChange> = new EventEmitter<MatRadioChange>();

    constructor(private service: ImportsService) { }

    ngOnInit() {
        this.models = this.service.getImportModels();
    }

    ngOnDestroy() {
    }

    changeHandler(event: MatRadioChange) {
        this.change.emit(event);
    }

}
