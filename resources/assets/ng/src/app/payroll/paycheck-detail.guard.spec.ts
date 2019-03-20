import { TestBed, async, inject } from '@angular/core/testing';

import { PaycheckDetailGuard } from './paycheck-detail.guard';

describe('PaycheckDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaycheckDetailGuard]
    });
  });

  it('should ...', inject([PaycheckDetailGuard], (guard: PaycheckDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
