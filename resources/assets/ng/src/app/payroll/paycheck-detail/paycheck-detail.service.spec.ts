import { TestBed } from '@angular/core/testing';

import { PaycheckDetailService } from './paycheck-detail.service';

describe('PaycheckDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaycheckDetailService = TestBed.get(PaycheckDetailService);
    expect(service).toBeTruthy();
  });
});
