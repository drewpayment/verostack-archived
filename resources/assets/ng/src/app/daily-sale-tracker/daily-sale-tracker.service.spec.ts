import { TestBed, inject } from '@angular/core/testing';

import { DailySaleTrackerService } from './daily-sale-tracker.service';

describe('DailySaleTrackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DailySaleTrackerService]
    });
  });

  it('should be created', inject([DailySaleTrackerService], (service: DailySaleTrackerService) => {
    expect(service).toBeTruthy();
  }));
});
