import { TestBed } from '@angular/core/testing';

import { RefreshIndicatorService } from './refresh-indicator.service';

describe('RefreshIndicatorService', () => {
  let service: RefreshIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshIndicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
