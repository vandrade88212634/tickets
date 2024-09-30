import { TestBed } from '@angular/core/testing';

import { LoginFirstService } from './login-first.service';

describe('LoginFirstService', () => {
  let service: LoginFirstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginFirstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
