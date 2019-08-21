import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ImportsService } from '../imports.service';
import { ImportModel } from '@app/models';
import { Observable } from 'rxjs';
import { MatRadioChange, MatSelectChange } from '@angular/material';

@Component({
    selector: 'vs-import-model-selection',
    templateUrl: './import-model-selection.component.html',
    styleUrls: ['./import-model-selection.component.scss']
})
export class ImportModelSelectionComponent implements OnInit, OnDestroy {

    models: Observable<ImportModel[]>;

    @Output() change: EventEmitter<ImportModel> = new EventEmitter<ImportModel>();

    constructor(private service: ImportsService) { }

    ngOnInit() {
        this.models = this.service.getImportModels();
    }

    ngOnDestroy() {
    }

    changeHandler(event: MatSelectChange) {
        this.change.emit(event.value);
    }

    radioChange(event: MatRadioChange) {
        this.change.emit(event.value);
    }

}
