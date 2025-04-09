import { TestBed } from '@angular/core/testing';

import { DyrInZooService } from './dyr-in-zoo.service';

describe('DyrInZooService', () => {
  let service: DyrInZooService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DyrInZooService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
