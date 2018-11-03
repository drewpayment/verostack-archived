import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerService } from './loading-spinner.service';

@Component({
  selector: 'vero-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  showSpinner: boolean;
  loadingText = '';
  zIndex = 9999;
  template = "\n  <div class=\"lds-roller\"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>";

  constructor(private service: LoadingSpinnerService) { }

  ngOnInit() {
    this.service.showSpinner.subscribe((next: boolean) => {
      this.showSpinner = next;
    });
  }

  show(): void {
    this.service.show();
  }

  hide(): void {
    this.service.hide();
  }

}
