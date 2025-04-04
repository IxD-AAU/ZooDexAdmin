import { TestBed } from '@angular/core/testing';

import { PersonaleGetterService } from './personale-getter.service';

describe('PersonaleGetterService', () => {
  let service: PersonaleGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaleGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
