import { TestBed } from '@angular/core/testing';

import { UsernameGetterService } from './username-getter.service';

describe('UsernameGetterService', () => {
  let service: UsernameGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsernameGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
