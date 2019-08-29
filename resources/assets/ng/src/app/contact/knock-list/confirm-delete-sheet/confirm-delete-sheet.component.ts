import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
    selector: 'vs-confirm-delete-sheet',
    templateUrl: './confirm-delete-sheet.component.html'
})
export class ConfirmDeleteSheetComponent implements OnInit {

    pendingDeletes:number;

    constructor(
        private ref: MatBottomSheetRef<ConfirmDeleteSheetComponent>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: { pendingCount:number }
    ) { 
        this.pendingDeletes = this.data.pendingCount;
    }

    ngOnInit() {
    }

    confirmDelete(confirmed:boolean) {
        this.ref.dismiss(confirmed);
    }

}
