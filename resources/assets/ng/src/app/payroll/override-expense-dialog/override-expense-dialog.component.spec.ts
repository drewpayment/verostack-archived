import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverrideExpenseDialogComponent } from './override-expense-dialog.component';

describe('OverrideExpenseDialogComponent', () => {
  let component: OverrideExpenseDialogComponent;
  let fixture: ComponentFixture<OverrideExpenseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverrideExpenseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverrideExpenseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
