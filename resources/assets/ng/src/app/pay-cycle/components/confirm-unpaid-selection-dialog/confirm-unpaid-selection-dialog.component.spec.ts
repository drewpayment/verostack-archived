import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmUnpaidSelectionDialogComponent } from './confirm-unpaid-selection-dialog.component';

describe('ConfirmUnpaidSelectionDialogComponent', () => {
  let component: ConfirmUnpaidSelectionDialogComponent;
  let fixture: ComponentFixture<ConfirmUnpaidSelectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmUnpaidSelectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmUnpaidSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
