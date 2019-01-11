import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollFilterDialogComponent } from './payroll-filter-dialog.component';

describe('PayrollFilterDialogComponent', () => {
  let component: PayrollFilterDialogComponent;
  let fixture: ComponentFixture<PayrollFilterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollFilterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
