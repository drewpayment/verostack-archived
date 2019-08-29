import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-mapper',
  templateUrl: './select-mapper.component.html',
  styleUrls: ['./select-mapper.component.css']
})
export class SelectMapperComponent implements OnInit {

  isMappedByUsername: boolean;
  toggleTitle: string;

  constructor(
    public ref: MatDialogRef<SelectMapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isMappedByUsername = false;
  }

  ngOnInit() {
    this.toggleTitle = this.isMappedByUsername ? 'Map invoice by Username' : 'Map invoice by Sales ID';
  }

  closeDialog(mapBy: string): void {
    this.ref.close(mapBy);
  }

}
