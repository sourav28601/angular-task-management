import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { outerGuard } from './outer.guard';

describe('outerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => outerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
