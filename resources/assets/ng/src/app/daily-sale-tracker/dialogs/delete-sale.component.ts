import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'delete-sale-dialog',
  templateUrl: './delete-sale.component.html'
})
export class DeleteSaleDialog {
  constructor(private ref:MatDialogRef<DeleteSaleDialog>) {}

  onNoClick():void {
    this.ref.close();
  }
}
