import {Pipe, PipeTransform} from '@angular/core';
import { Payroll } from '@app/models';

@Pipe({
    name: 'grossTotalReleaseAmount'
})
export class GrossTotalReleaseAmountPipe implements PipeTransform {

    /**
     * Iterates through all payrolls, details and calculates the totals of the sales, expenses and overrides.
     * 
     * @param payrolls 
     * @param args 
     */
    transform(payrolls:Payroll[], args?: any): any {
        let total = 0;
        
        payrolls.forEach(p => {

            p.details.forEach(d => {
                const salesGross = d.grossTotal;
                const expenses = d.expenses.map(e => e.amount).reduce((t, n) => t + n, 0);
                const overrides = d.overrides.map(o => (o.amount * o.units)).reduce((t, n) => t + n, 0);
                total += (+salesGross + +expenses + +overrides);
            });

        });
        
        return total;
    }

}
