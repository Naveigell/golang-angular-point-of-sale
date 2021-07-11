import { TestBed } from '@angular/core/testing';

import { ErrorGuardService } from './error-guard.service';

describe('ErrorGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorGuardService = TestBed.get(ErrorGuardService);
    expect(service).toBeTruthy();
  });
});
