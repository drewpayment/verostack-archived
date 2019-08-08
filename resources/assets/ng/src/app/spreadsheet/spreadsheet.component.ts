import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { Spreadsheet } from 'dhx-spreadsheet';

@Component({
    selector: 'vs-spreadsheet',
    templateUrl: './spreadsheet.component.html',
    styleUrls: ['./spreadsheet.component.scss']
})
export class SpreadsheetComponent implements OnInit, OnDestroy {
    @ViewChild('widget') container: ElementRef;
    spreadsheet: Spreadsheet;

    @Input() toolbar: String[];
    @Input() menu: boolean;
    @Input() editLine: boolean;
    @Input() rowsCount: number;
    @Input() colsCount: number;

    constructor() { }

    ngOnInit() {
        this.spreadsheet = new Spreadsheet(this.container.nativeElement, {
            toolbar: this.toolbar,
            menu: this.menu,
            editLine: this.editLine,
            rowsCount: this.rowsCount,
            colsCount: this.colsCount,
        });
    }

    ngOnDestroy() {
        this.spreadsheet.destructor();
    }

}
