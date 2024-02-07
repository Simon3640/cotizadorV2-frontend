import { TestBed } from '@angular/core/testing';

import { EmpleadosService } from './user.service';

describe('EmpleadoService', () => {
  let service: EmpleadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
