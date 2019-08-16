import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FileUploader, FileUploaderOptions, FileItem } from 'ng2-file-upload';
import { Spreadsheet } from 'dhx-spreadsheet';
import { IConvertMessageData, ISheetData, IStyle, IDataCell } from '@app/models';
import { isNumber } from 'util';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
    selector: 'vs-process',
    templateUrl: './process.component.html',
    styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

    fu = new FileUploader({
        url: null,
        autoUpload: false,
        allowedFileType: ['csv', 'xsl', 'xslx'],
    });
    hasFile = false;
    @ViewChild('fuRef') uploader: ElementRef;

    @ViewChild('spreadsheet') container: ElementRef;
    ss: Spreadsheet;

    currentlyViewedWb: number;
    workbooksToReview: ISheetData[] = [];
    styles: IStyle[];

    constructor(private cd: ChangeDetectorRef) { }

    ngOnInit() {
    }

    fileAddedHandler(item: FileList) {
        const file = item.item(0);
        const ext = file.name.split('.').pop();

        if (ext == 'csv' || ext == 'xsl' || ext == 'xlsx') {
            const workerUrl = window.URL.createObjectURL(new Blob([
                'importScripts("https://cdn.dhtmlx.com/libs/excel2json/1.0/worker.js")',
            ], { type: 'text/javascript' }));
            const worker = new Worker(workerUrl);
            
            worker.postMessage({
                type: 'convert',
                data: file
            });

            worker.addEventListener('message', (e) => {
                if (e.data.type === 'ready') {
                    this.hasFile = true;
                    this.cd.detectChanges();

                    this.workbooksToReview = e.data.data as ISheetData[];
                    this.styles = e.data.styles as IStyle[];

                    this.currentlyViewedWb = 0;
                    this.loadWorkbook(this.workbooksToReview[this.currentlyViewedWb]);
                }
            });
            
        }

        
    }

    loadWorkbook(wb: ISheetData) {
        this.ss = new Spreadsheet(this.container.nativeElement, {
            menu: true,
            editLine: false,
            rowsCount: wb.rows.length,
            colsCount: wb.cols.length,
            autoFormat: false,
        });
        
        const data = {
            data: [],
            styles: {}
        };
        wb.cells.forEach((row, i, a) => {
            row.forEach((col, j, b) => {
                const cellLetters = this.getCellLetter(j);
                const rowNo = (i + 1);
                const cellDest = `${cellLetters}${rowNo}`;
                const styleClassName = `spreadsheet-${cellDest}`;
                const cellValue = this.autoFormat(col);

                data.data.push({
                    cell: cellDest,
                    value: cellValue,
                    css: styleClassName,
                });

                if (col) {
                    data.styles[styleClassName] = this.styles[col.s];
                }
            });
        });
        
        this.ss.parse(data);
    }

    /**
     * Evaluates the column to check if it's a number attempts to remove any zero-decimals
     * because the spreadsheet library turns integers into doubles and leaves ".0" at the end 
     * of all integers.... wrecking formatting of account numbers, etc.
     */
    private autoFormat(col: IDataCell): String {
        // if the col is not null, the value is not null and the value is a number
        if (col && col.v && !isNaN((<any>col.v))) {
            const numSplit = col.v.toString().split('.');
            // the number after the decimal is not '00'
            if ((<any>numSplit[numSplit.length - 1]) > 0) {
                return col.v;
            } else { // this is a number like '##.0' and should be considered an integer
                const formattedDate = this.excelDateToMoment(<any>numSplit[0]);

                if (formattedDate) return formattedDate.format('MM-DD-YYYY');

                return numSplit[0]; 
            }
        } else if (col) {
            return col.v;
        }
        return null;
    }

    private excelDateToMoment(serial: number): Moment {
        const utcDays = Math.floor(serial - 25569);
        const utcValue = utcDays * 86400;
        const dateInfo = moment(utcValue * 1000);
        if (!dateInfo.isValid()) return null;
        // TODO: Not the best way to do this... there is still a chance that some number converted to a moment date
        if (dateInfo.isBefore(moment().subtract(1, 'year'), 'day') || dateInfo.isAfter(moment(), 'day')) {
            return null;
        }
        const fractionalDay = serial - Math.floor(serial) + 0.0000001;
        let totalSeconds = Math.floor(86400 * fractionalDay);
        const seconds = totalSeconds % 60;
        totalSeconds -= seconds;
        const hours = Math.floor(totalSeconds / (60 * 60));
        const minutes = Math.floor(totalSeconds / 60) % 60;
        return dateInfo.hour(hours).minute(minutes).second(seconds);
    }

    private getCellLetter(index: number) {
        const adjIdx = index + 1;
        const dict = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
            'u', 'v', 'w', 'x', 'y', 'z'];

        if (adjIdx > dict.length && ((adjIdx % dict.length) % dict.length)) {
            const firstLetter = Math.floor((index + 1) / dict.length) - 1;
            const secondLetter = (adjIdx % dict.length) % dict.length - 1;
            return `${dict[firstLetter]}${dict[secondLetter]}`;
        } else if (adjIdx > dict.length) {
            const firstLetter = adjIdx % dict.length;
            const secondLetter = Math.floor((adjIdx - 1) % dict.length);
            return `${dict[firstLetter]}${dict[secondLetter]}`;
        }

        return `${dict[index]}`;
    }

    uploadFile() {
        this.uploader.nativeElement.click();
    }

    importReport() {
        if (!this.hasFile) return;

        const ssData = this.ss.serialize();

        console.dir(ssData);
    }

}
