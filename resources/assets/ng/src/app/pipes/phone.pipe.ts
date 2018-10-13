import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'phone'
})
export class PhonePipe implements PipeTransform {
    transform(value: string, args?: any): any {
        value = value + '';
        let npa = value.substr(0, 3);
        let npx = value.substr(3, 3);
        let xxxx = value.substr(6, 4);
        return `(${npa}) ${npx}-${xxxx}`;
    }
}
