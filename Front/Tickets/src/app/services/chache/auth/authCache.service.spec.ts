import { TestBed } from '@angular/core/testing';

import { AuthCacheService } from './authCache.service';

describe('AuthCacheService', () => {
  let service: AuthCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
