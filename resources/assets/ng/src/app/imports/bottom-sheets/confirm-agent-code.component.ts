import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';


@Component({
    templateUrl: './confirm-agent-code.component.html',
    styles: [],
    selector: 'vs-confirm-agent-bs'
})
export class ConfirmAgentBottomSheetComponent implements OnInit {
    
    constructor(private _bottomSheetRef: MatBottomSheetRef<ConfirmAgentBottomSheetComponent>) {}

    ngOnInit() {}

    useCode() {

        console.log('USE CODE!');
        this._bottomSheetRef.dismiss(true);
    }

    confirmNoCode() {
        this._bottomSheetRef.dismiss();
    }

}
