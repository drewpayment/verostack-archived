import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyFormControlComponent } from './currency-form-control.component';

describe('CurrencyFormControlComponent', () => {
  let component: CurrencyFormControlComponent;
  let fixture: ComponentFixture<CurrencyFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
