import { TestBed } from '@angular/core/testing';

import { Fichajes } from './fichajes';

describe('Fichajes', () => {
  let service: Fichajes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fichajes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
