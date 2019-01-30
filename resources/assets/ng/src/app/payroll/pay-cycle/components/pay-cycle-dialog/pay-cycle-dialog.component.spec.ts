import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCycleDialogComponent } from './pay-cycle-dialog.component';

describe('PayCycleDialogComponent', () => {
  let component: PayCycleDialogComponent;
  let fixture: ComponentFixture<PayCycleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayCycleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayCycleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
