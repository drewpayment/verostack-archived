import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { IAgentSale } from "../../models";

@Component({
  selector: 'reject-note-dialog',
  templateUrl: 'reject-note.component.html',
  styleUrls: ['reject-note.component.scss']
})
export class RejectNoteDialogComponent {

  item: IAgentSale;
  index:number;

  constructor(
    public dialogRef: MatDialogRef<RejectNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.item = data.item;
      this.index = data.index;
    }

  onNoClick(): void {
    this.dialogRef.close({ item: this.item, index: this.index });
  }
}
