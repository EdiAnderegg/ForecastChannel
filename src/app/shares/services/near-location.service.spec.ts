import { TestBed } from '@angular/core/testing';

import { NearLocationService } from './near-location.service';

describe('NearLocationService', () => {
  let service: NearLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NearLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
