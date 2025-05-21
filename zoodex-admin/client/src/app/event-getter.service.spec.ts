import { TestBed } from '@angular/core/testing';

import { EventGetterService } from './event-getter.service';

describe('EventGetterService', () => {
  let service: EventGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
