import {Pipe, PipeTransform} from '@angular/core';
import { PayrollDetails } from '@app/models';
import { coerceNumberProperty } from '@app/utils';

@Pipe({
    name: 'payrollDetailTotals'
})
export class PayrollDetailTotalsPipe implements PipeTransform {
    transform(value:PayrollDetails, args:'grossTotal'|'netTotal' = 'grossTotal'): any {
        if (args == 'grossTotal')
            return this.calculateGrossTotal(value);
        else if (args == 'netTotal')
            return this.calculateNetTotal(value);
    }

    private calculateGrossTotal(detail:PayrollDetails):number {
        let expenses = detail.expenses.map(e => e.amount).reduce((t, n) => 
            coerceNumberProperty(t) + coerceNumberProperty(n), 0);
        let overrides = detail.overrides.map(o => (o.amount * o.units)).reduce((t, n) => 
            coerceNumberProperty(t) + coerceNumberProperty(n), 0);
        expenses = coerceNumberProperty(expenses);
        overrides = coerceNumberProperty(overrides);
        const currGross = coerceNumberProperty(detail.grossTotal);
        return currGross + expenses + overrides;
    }

    private calculateNetTotal(detail:PayrollDetails):number {
        let result = this.calculateGrossTotal(detail);
        result = +result - +detail.taxes;
        return result;
    }
}
