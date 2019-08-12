import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';

@Component({
    selector: 'vs-process',
    templateUrl: './process.component.html',
    styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

    fu: FileUploader;
    hasFile = false;
    @ViewChild('fuRef') uploader: ElementRef;

    constructor() { }

    ngOnInit() {
        const options: FileUploaderOptions = {
            url: '',
            allowedFileType: ['csv', 'xsl', 'xslx'],
        };
        this.fu = new FileUploader(options);
        this.fu.onAfterAddingFile = (item) => this.hasFile = true;
    }

    uploadFile() {
        console.log('UPLOAD FILE');
        this.uploader.nativeElement.click();
    }

    importReport() {
        if (this.hasFile) {
            console.log('We\'ve got a file! Let\'s upload it!');
        }
    }

}
