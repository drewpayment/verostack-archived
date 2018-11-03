import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClientService } from "@app/client-information/client.service";
import { SaleStatus } from "@app/models";

interface DialogData {
  existing?:SaleStatus
}

@Component({
  selector: 'add-sale-status-dialog',
  templateUrl: './add-sale-status.component.html',
  styleUrls: ['./add-sale-status.component.scss']
})
export class AddSaleStatusDialog implements OnInit {

  form:FormGroup;

  constructor(
    public ref:MatDialogRef<AddSaleStatusDialog>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
    private fb:FormBuilder,
    private clientService:ClientService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  onNoClick():void {
    this.ref.close();
  }

  private createForm():void {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      isActive: this.fb.control(true)
    });
  }

  private resetForm():void {
    this.form.patchValue({
      name: null,
      isActive: true
    });
  }

}
