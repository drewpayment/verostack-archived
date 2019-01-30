import { TestBed } from '@angular/core/testing';

import { PayCycleService } from './pay-cycle.service';

describe('PayCycleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayCycleService = TestBed.get(PayCycleService);
    expect(service).toBeTruthy();
  });
});
