import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'vs-import-models',
    templateUrl: './import-models.component.html',
    styleUrls: ['./import-models.component.scss']
})
export class ImportModelsComponent implements OnInit {

    isFabOpen$ = new BehaviorSubject<boolean>(false);

    constructor() { }

    ngOnInit() {
    }

    addImportModel() {
        console.log('add import model!');
    }

}
