import { TestBed } from '@angular/core/testing';

import { EmpleadoGuard } from './user.guard';

describe('EmpleadoGuard', () => {
  let guard: EmpleadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmpleadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
