import { TestBed } from '@angular/core/testing';

import { FloatBtnService } from './float-btn.service';

describe('FloatBtnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FloatBtnService = TestBed.get(FloatBtnService);
    expect(service).toBeTruthy();
  });
});
