import { Directive, ElementRef, Renderer, HostListener } from "@angular/core";
import { PayrollService } from "@app/payroll/payroll.service";
import { IAgentSale, AgentSale } from "@app/models";
import { MessageService } from "@app/message.service";
import { SessionService } from "@app/session.service";

import * as _ from 'lodash';


@Directive({
  selector: `[vs-paste]`
})
export class VsPasteDirective {

  result:IAgentSale[];
  isEmpty:boolean;

  constructor(
    private el:ElementRef,
    private renderer:Renderer,
    private service:PayrollService,
    private msg:MessageService,
    private session:SessionService
  ) {}

  @HostListener('document:paste', ['$event'])
  paste(event:any) {
    event.preventDefault();
    this.session.showLoader();
    this.result = [];
    const data = event.clipboardData.getData('text');
    let rows = data.split(String.fromCharCode(13));

    for(let i = 0; i < rows.length; i++) {
      rows[i] = rows[i].split(String.fromCharCode(9));
    }

    for(let i = 0; i < rows.length; i++) {
      const row = rows[i];
      let agent = new AgentSale(row);
      this.result.push(agent);
    }

    if(this.result.length < 2) {
      let test = [];
      for(let i = 0; i < this.result.length; i++) {
        test = [...Object.values(this.result[i])];
      }
      _.remove(test, _.isNull);

      if(_.isEmpty(test)) {
        this.session.hideLoader();
        this.msg.addMessage('Oops, please check the format of your invoice.', 'dismiss', 6000);
        return;
      }
    }

    this.result.push(this.service.insertSalesRow());
    this.service.sales$.next(this.result);
    this.session.hideLoader();
    this.msg.addMessage('We have imported your invoice. Please check for accuracy.', 'dismiss', 6000);
  }
}
