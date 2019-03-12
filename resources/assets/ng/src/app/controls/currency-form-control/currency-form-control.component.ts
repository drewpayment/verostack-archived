import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CurrencyFormControlComponent),
    multi: true
};

@Component({
    selector: 'vs-currency-form-control',
    providers: [CUSTOM_VALUE_ACCESSOR],
    templateUrl: './currency-form-control.component.html',
    styleUrls: ['./currency-form-control.component.scss']
})
export class CurrencyFormControlComponent implements ControlValueAccessor {
    private _disabled:boolean;
    private _onChange:Function;
    private _onTouched:Function;

    constructor() {
        this._disabled = false;
        this._onChange = (_:any) => {};
        this._onTouched = () => {};
    }

    writeValue(obj: any): void {
        throw new Error('Method not implemented.');
    }
    registerOnChange(fn: any): void {
        throw new Error('Method not implemented.');
    }
    registerOnTouched(fn: any): void {
        throw new Error('Method not implemented.');
    }
    setDisabledState?(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }

}
