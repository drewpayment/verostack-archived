import { Component, OnInit, Input, ContentChild, Self, Optional, ChangeDetectorRef, ContentChildren, QueryList } from '@angular/core';
import { ImportsService } from '@app/imports/imports.service';
import { Observable } from 'rxjs';
import { ICampaign } from '@app/models';
import { coerceBooleanProperty } from '@app/utils';
import { MatOption, ErrorStateMatcher } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectTrigger } from '@angular/material/select';
import { SelectionModel } from '@angular/cdk/collections';
import { NgControl, NgForm, FormGroupDirective } from '@angular/forms';
import { Directionality } from '@angular/cdk/bidi';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

@Component({
    selector: 'vs-campaigns-selection',
    templateUrl: './campaigns-selection.component.html',
    styleUrls: ['./campaigns-selection.component.scss']
})
export class CampaignsSelectionComponent implements OnInit {

    /** All of the defined select options. */
    @ContentChildren(MatOption, { descendants: true }) options: QueryList<MatOption>;

    /** Manages keyboard events for options in the panel. */
    _keyManager: ActiveDescendantKeyManager<MatOption>;

    private _required = false;

    /**
     * INPUT CONTROLS
     */
    @Input()
    get required(): boolean { return this._required; }
    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
    }

    /** Classes to be passed to the select panel. Supports the same syntax as `ngClass`. */
    @Input() panelClass: string | string[] | Set<string> | { [key: string]: any };

    /** User-supplied override of the trigger element. */
    @ContentChild(MatSelectTrigger, { static: true }) customTrigger: MatSelectTrigger;

    private _placeholder: string;

    /** Placeholder to be shown if no value has been selected. */
    @Input()
    get placeholder(): string { return this._placeholder; }
    set placeholder(value: string) {
        this._placeholder = value;
    }

    private _multiple: boolean;
    private _selectionModel: SelectionModel<MatOption>;

    /** Whether the user should be allowed to select multiple options. */
    @Input()
    get multiple(): boolean { return this._multiple; }
    set multiple(value: boolean) {
        if (this._selectionModel) {
            throw getMatSelectDynamicMultipleError();
        }

        this._multiple = coerceBooleanProperty(value);
    }

    private _disableOptionCentering: boolean;

    /** Whether to center the active option over the trigger. */
    @Input()
    get disableOptionCentering(): boolean { return this._disableOptionCentering; }
    set disableOptionCentering(value: boolean) {
        this._disableOptionCentering = coerceBooleanProperty(value);
    }

    private _compareWith = (o1: any, o2: any) => o1 === o2;

    /**
     * Function to compare the option values with the selected values. The first argument
     * is a value from an option. The second is a value from the selection. A boolean
     * should be returned.
     */
    @Input()
    get compareWith() { return this._compareWith; }
    set compareWith(fn: (o1: any, o2: any) => boolean) {
        if (typeof fn !== 'function') {
            throw getMatSelectNonFunctionValueError();
        }
        this._compareWith = fn;
        if (this._selectionModel) {
            // A different comparator means the selection could change.
            this._initializeSelection();
        }
    }

    /** Value of the select control. */
    @Input()
    get value(): any { return this._value; }
    set value(newValue: any) {
        if (newValue !== this._value) {
            this.writeValue(newValue);
            this._value = newValue;
        }
    }
    private _value: any;

    /** Aria label of the select. If not specified, the placeholder will be used as label. */
    @Input('aria-label') ariaLabel: string = '';

    /** Input that can be used to specify the `aria-labelledby` attribute. */
    @Input('aria-labelledby') ariaLabelledby: string;

    /** Object used to control when error messages are shown. */
    @Input() errorStateMatcher: ErrorStateMatcher;

    /** Time to wait in milliseconds after the last keystroke before moving focus to an item. */
    @Input() typeaheadDebounceInterval: number;

    /**
     * Function used to sort the values in a select in multiple mode.
     * Follows the same logic as `Array.prototype.sort`.
     */
    @Input() sortComparator: (a: MatOption, b: MatOption, options: MatOption[]) => number;

    /** Unique id of the element. */
    @Input()
    get id(): string { return this._id; }
    set id(value: string) {
        this._id = value;
    }
    private _id: string;


    campaigns: Observable<ICampaign[]>;

    constructor(
        private service: ImportsService,
        @Self() @Optional() public ngControl: NgControl,
        private _changeDetectorRef: ChangeDetectorRef,
        @Optional() private _dir: Directionality,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        @Optional() private _parentFormField: MatFormField,
    ) { }

    ngOnInit() {
        this.campaigns = this.service.campaigns;
        this.service.fetchCampaigns();
    }

    /**
   * Sets the select's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param value New value to be written to the model.
   */
    writeValue(value: any): void {
        if (this.options) {
            this._setSelectionByValue(value);
        }
    }

    private _initializeSelection(): void {
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then(() => {
            if (this.ngControl || this._value) {
                this._setSelectionByValue(this.ngControl ? this.ngControl.value : this._value);
            }
        });
    }

    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    private _setSelectionByValue(value: any | any[]): void {
        if (this.multiple && value) {
            if (!Array.isArray(value)) {
                throw getMatSelectNonArrayValueError();
            }

            this._selectionModel.clear();
            value.forEach((currentValue: any) => this._selectValue(currentValue));
            this._sortValues();
        } else {
            this._selectionModel.clear();
            const correspondingOption = this._selectValue(value);

            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what option the user interacted with last.
            if (correspondingOption) {
                this._keyManager.setActiveItem(correspondingOption);
            }
        }

        this._changeDetectorRef.markForCheck();
    }

    /** Sorts the selected values in the selected based on their order in the panel. */
    private _sortValues() {
        if (this.multiple) {
            const options = this.options.toArray();

            this._selectionModel.sort((a, b) => {
                return this.sortComparator ? this.sortComparator(a, b, options) :
                    options.indexOf(a) - options.indexOf(b);
            });
        }
    }

    /**
   * Finds and selects and option based on its value.
   * @returns Option that has the corresponding value.
   */
    private _selectValue(value: any): MatOption | undefined {
        const correspondingOption = this.options.find((option: MatOption) => {
            try {
                // Treat null as a special reset value.
                return option.value != null && this._compareWith(option.value, value);
            } catch (error) {
                // if (isDevMode()) {
                    // Notify developers of errors in their comparator.
                    console.warn(error);
                // }
                return false;
            }
        });

        if (correspondingOption) {
            this._selectionModel.select(correspondingOption);
        }

        return correspondingOption;
    }

}

export function getMatSelectDynamicMultipleError(): Error {
    return Error('Cannot change `multiple` mode of select after initialization.');
}

/**
 * Returns an exception to be thrown when attempting to assign a non-array value to a select
 * in `multiple` mode. Note that `undefined` and `null` are still valid values to allow for
 * resetting the value.
 * @docs-private
 */
export function getMatSelectNonArrayValueError(): Error {
    return Error('Value must be an array in multiple-selection mode.');
}

/**
 * Returns an exception to be thrown when assigning a non-function value to the comparator
 * used to determine if a value corresponds to an option. Note that whether the function
 * actually takes two values and returns a boolean is not checked.
 */
export function getMatSelectNonFunctionValueError(): Error {
    return Error('`compareWith` must be a function.');
}
