import { TestBed } from '@angular/core/testing';

import { PointofsaleService } from './pointofsale.service';

describe('PointofsaleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PointofsaleService = TestBed.get(PointofsaleService);
    expect(service).toBeTruthy();
  });
});
