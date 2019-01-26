import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmReleaseDialogComponent } from './confirm-release-dialog.component';

describe('ConfirmReleaseDialogComponent', () => {
  let component: ConfirmReleaseDialogComponent;
  let fixture: ComponentFixture<ConfirmReleaseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmReleaseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmReleaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
