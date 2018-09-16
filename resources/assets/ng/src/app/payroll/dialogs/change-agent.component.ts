import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'changeAgentDialog',
  templateUrl: './change-agent.component.html',
  styleUrls: ['./change-agent.component.scss']
})
export class ChangeAgentDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<ChangeAgentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {

  }

  clearSales(): void {
    this.dialogRef.close(true);
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

}
