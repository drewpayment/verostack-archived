import {Pipe, PipeTransform} from '@angular/core';
import { PayrollDetails } from '@app/models';

@Pipe({
    name: 'payrollDetailTotals'
})
export class PayrollDetailTotalsPipe implements PipeTransform {
    transform(value:PayrollDetails, args:'grossTotal'|'netTotal' = 'grossTotal'): any {
        if(args == 'grossTotal')
            return this.calculateGrossTotal(value);
        else if(args == 'netTotal')
            return this.calculateNetTotal(value);
    }

    private calculateGrossTotal(detail:PayrollDetails):number {
        const expenses = detail.expenses.map(e => e.amount).reduce((t, n) => t + n, 0);
        const overrides = detail.overrides.map(o => (o.amount * o.units)).reduce((t, n) => t + n, 0);
        const result = +detail.grossTotal + +expenses + +overrides;
        return result;
    }

    private calculateNetTotal(detail:PayrollDetails):number {
        let result = this.calculateGrossTotal(detail);
        result = +result - +detail.taxes;
        return result;
    }
}
