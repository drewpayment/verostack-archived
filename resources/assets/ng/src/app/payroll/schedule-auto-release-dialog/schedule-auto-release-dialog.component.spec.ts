import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAutoReleaseDialogComponent } from './schedule-auto-release-dialog.component';

describe('ScheduleAutoReleaseDialogComponent', () => {
  let component: ScheduleAutoReleaseDialogComponent;
  let fixture: ComponentFixture<ScheduleAutoReleaseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleAutoReleaseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleAutoReleaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
