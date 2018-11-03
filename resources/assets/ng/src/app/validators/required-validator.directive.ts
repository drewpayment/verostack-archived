import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[requiredValidator]'
})
export class RequiredValidatorDirective {

  protected _elementClass: string[] = [];

  constructor(private el: ElementRef, private renderer: Renderer2) {
    console.dir(el);

    if(el.nativeElement.firstElementChild !== null) console.dir(el.nativeElement.firstElementChild.validity);
  }

  @HostListener('mouseleave') fieldBlur() {
    // this.el.nativeElement.validity.valid = false;
      // this.invalidateField();

    if(!this.el.nativeElement.validity.valid) this.invalidateField();
  }

  @HostBinding('class')
  get elementClass(): string {
    return this._elementClass.join(' ');
  }

  private invalidateField(): void {
    // this.renderer.addClass(this.el.nativeElement, 'mat-form-field-invalid');
    // this.renderer.addClass(this.el.nativeElement, 'mat-input-invalid');
    // this.renderer.addClass(this.el.nativeElement, 'text-danger');

    this._elementClass.push('mat-form-field-invalid');
    this._elementClass.push('mat-input-invalid');
    this._elementClass.push('text-danger');
  }

}
