import { TestBed } from '@angular/core/testing';

import { CustomerResolver } from './customer-resolver';

describe('CustomerResolver', () => {
  let service: CustomerResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
