import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySaleTrackerComponent } from './daily-sale-tracker.component';

describe('DailySaleTrackerComponent', () => {
  let component: DailySaleTrackerComponent;
  let fixture: ComponentFixture<DailySaleTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySaleTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySaleTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
