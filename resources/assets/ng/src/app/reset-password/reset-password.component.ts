import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vs-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
      // reset id is saved as snapshot to what was requested from email to avoid tampering
      const resetId = this.route.snapshot.params['resetId'];
      
  }

}
