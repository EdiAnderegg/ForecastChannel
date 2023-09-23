import { TestBed } from '@angular/core/testing';

import { UvIndexService } from './uv-index.service';

describe('UvIndexService', () => {
  let service: UvIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UvIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
