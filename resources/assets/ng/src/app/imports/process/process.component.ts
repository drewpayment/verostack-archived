import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vs-process',
    templateUrl: './process.component.html',
    styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

    hasFile = false;

    constructor() { }

    ngOnInit() {
    }

    uploadFile() {
        console.log('UPLOAD FILE');
        this.hasFile = true;
    }

    importReport() {
        if (this.hasFile) {
            console.log('We\'ve got a file! Let\'s upload it!');
        }
    }

}
