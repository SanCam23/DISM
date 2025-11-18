import { TestBed } from '@angular/core/testing';

import { Trabajos } from './trabajos';

describe('Trabajos', () => {
  let service: Trabajos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Trabajos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
