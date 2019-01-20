import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'currencyInput'
})
export class CurrencyInputPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        console.dir([value, args]);
        let result:string = this.isNumeric(value) ? value + '' : value;
        let firstChar = result.charAt(0);
        if(!this.isNumeric(firstChar))
            result.slice(0, 1);
        let decimalIndex = result.indexOf('.');
        result.slice(decimalIndex, 2);
        result = result == null || result.length == 0 ? `00` : result;
        return `$${result}.00`;
    }

    private isNumeric(value: any): boolean {
        return !isNaN(value - parseFloat(value));
    }
}
