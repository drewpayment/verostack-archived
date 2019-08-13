import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FileUploader, FileUploaderOptions, FileItem } from 'ng2-file-upload';
import { Spreadsheet } from 'dhx-spreadsheet';
import { IConvertMessageData, ISheetData, IStyle } from '@app/models';

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

        console.log(`File extension: ${ext}`);

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

                    this.workbooksToReview.forEach((wb, i, a) => {
                        this.currentlyViewedWb = i;
                        this.loadWorkbook(wb);
                    });

                    
                }
            });
            
        }

        
    }

    loadWorkbook(wb: ISheetData) {
        this.ss = new Spreadsheet(this.container.nativeElement, {
            toolbar: [],
            menu: true,
            editLine: false,
            rowsCount: wb.rows.length,
            colsCount: wb.cols.length,
        });
        
        const data = [];
        wb.cells.forEach((row, i, a) => {
            row.forEach((cell, j, b) => {
                const cellLetters = this.getCellLetter(j);
                const rowNo = (i + 1);
                const cellDest = `${cellLetters}${rowNo}`;
                data.push({
                    cell: cellDest,
                    value: cell ? cell.v : null,
                });

                if (cell) this.ss.setStyle(cellDest, this.styles[cell.s]);
            });
        });
        this.ss.parse(data);
    }

    private getCellLetter(index: number) {
        const dict = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
            'u', 'v', 'w', 'x', 'y', 'z'];

        if (index > dict.length) {
            const rem = index - dict.length;
            return `${dict[rem - 1]}${dict[rem - 1]}`;
        }

        return `${dict[index]}`;
    }

    uploadFile() {
        this.uploader.nativeElement.click();
    }

    importReport() {
        if (this.hasFile) {
            console.log('We\'ve got a file! Let\'s upload it!');
        }
    }

}
