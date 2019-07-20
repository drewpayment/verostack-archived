import {Pipe, PipeTransform} from '@angular/core';
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js';

@Pipe({
    name: 'phone'
})
export class PhonePipe implements PipeTransform {
    transform(value: string, country:string = 'US'): any {
        if (!value) return '';
        try {
            const phoneNumber = parsePhoneNumber(`${value}`, country as CountryCode);
            return phoneNumber.formatNational();
        } catch (error) {
            console.error(error);
            return value;
        }
    }
}
