import { TestBed } from '@angular/core/testing';

import { KnockListService } from './knock-list.service';

describe('KnockListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KnockListService = TestBed.get(KnockListService);
    expect(service).toBeTruthy();
  });
});
