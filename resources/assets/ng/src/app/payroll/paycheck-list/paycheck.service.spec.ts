import { TestBed } from '@angular/core/testing';

import { PaycheckService } from './paycheck.service';

describe('PaycheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaycheckService = TestBed.get(PaycheckService);
    expect(service).toBeTruthy();
  });
});
