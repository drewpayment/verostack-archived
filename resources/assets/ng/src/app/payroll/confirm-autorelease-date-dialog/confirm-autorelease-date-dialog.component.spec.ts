import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAutoreleaseDateDialogComponent } from './confirm-autorelease-date-dialog.component';

describe('ConfirmAutoreleaseDateDialogComponent', () => {
  let component: ConfirmAutoreleaseDateDialogComponent;
  let fixture: ComponentFixture<ConfirmAutoreleaseDateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmAutoreleaseDateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAutoreleaseDateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
