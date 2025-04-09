import { TestBed } from '@angular/core/testing';

import { DyrGetterService } from './dyr-getter.service';

describe('DyrGetterService', () => {
  let service: DyrGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DyrGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
